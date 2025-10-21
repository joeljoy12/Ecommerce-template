import { NextResponse } from "next/server"
import Stripe from "stripe"
import { writeClient } from "@/sanity/lib/sanityWriteClient"
import { client } from "@/sanity/lib/sanity.client"

export const runtime = "nodejs" // ✅ ensures crypto + fs work

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: Request) {
  try {
    const settings = await client.fetch(`*[_type == "storeSettings"][0]{allowedCountries}`)
    const { items, email } = await req.json()

    // ✅ Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 })
    }

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.imageUrl ? [item.imageUrl] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    if (!siteUrl) {
      throw new Error("NEXT_PUBLIC_SITE_URL is missing — set it in your .env")
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email: email || "guest@unknown.com",
      shipping_address_collection: {
        allowed_countries: Array.isArray(settings?.allowedCountries)
          ? settings.allowedCountries
          : ["US", "CA", "GB"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Free Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,
    })

    // ✅ Save order to Sanity
    await writeClient.create({
      _type: "order",
      stripeSessionId: session.id,
      email: email || "guest@unknown.com",
      total: line_items.reduce(
        (sum, i) => sum + (i.price_data.unit_amount / 100) * i.quantity,
        0
      ),
      items: items.map((i: any) => ({
        _key: crypto.randomUUID(),
        name: i.name,
        quantity: i.quantity,
        price: i.price,
        imageUrl: i.imageUrl,
      })),
      status: "processing",
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
