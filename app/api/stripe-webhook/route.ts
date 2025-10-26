import { headers as nextHeaders } from "next/headers"
import Stripe from "stripe"
import { writeClient } from "@/sanity/lib/sanityWriteClient"
import { client } from "@/sanity/lib/sanity.client"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    // ✅ Fetch Stripe keys dynamically from Sanity
    const settings = await client.fetch(`*[_type == "storeSettings"][0]{ stripeSection, allowedCountries }`)
    const stripeSecret = settings?.stripeSection?.secretKey
    const webhookSecret = settings?.stripeSection?.webhookSecret

    if (!stripeSecret) {
      return new Response("Stripe Secret Key not configured in Store Settings.", { status: 500 })
    }

    // ✅ Initialize Stripe safely *inside* the function
    const stripe = new Stripe(stripeSecret)

    // ✅ Get headers (Next.js 15 safe)
    const sig = (await nextHeaders()).get("stripe-signature")

    const { items, email } = await req.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response("No items provided", { status: 400 })
    }

    // ✅ Stripe line items
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

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    // ✅ Create Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email: email || "guest@unknown.com",
      shipping_address_collection: {
        allowed_countries:
          settings?.allowedCountries?.length > 0
            ? settings.allowedCountries
            : ["US", "CA", "GB"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Free Shipping",
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
      createdAt: new Date().toISOString(),
    })

    return new Response(JSON.stringify({ url: session.url }), { status: 200 })
  } catch (err: any) {
    console.error("❌ Stripe Checkout Error:", err.message)
    return new Response(`Error: ${err.message}`, { status: 500 })
  }
}
