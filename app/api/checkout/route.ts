import { NextResponse } from "next/server"
import Stripe from "stripe"
import { writeClient } from "@/sanity/lib/sanityWriteClient"
import { client } from "@/sanity/lib/sanity.client"; //

// ✅ Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const settings = await client.fetch(`*[_type == "storeSettings"][0]{allowedCountries}`)

export async function POST(req: Request) {
  try {
    const { items, email } = await req.json()

    // ✅ Validate request
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 })
    }

    // ✅ Prepare Stripe line items
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

    // ✅ Make sure NEXT_PUBLIC_SITE_URL exists
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    if (!siteUrl) {
      throw new Error(
        "NEXT_PUBLIC_SITE_URL is missing — set it in your .env.local (e.g. http://localhost:3000)"
      )
    }

    // ✅ Create Stripe Checkout session
    // ✅ Create Stripe Checkout session
const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  mode: "payment",
  line_items,
  customer_email: email || "guest@unknown.com",

  // 🚀 ADD THIS PART
  shipping_address_collection: {
    allowed_countries:settings?.allowedCountries?.length > 0
    ? settings.allowedCountries
    : ["US", "CA", "GB"] // customize countries
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
});



    

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
    _key: crypto.randomUUID(), // ✅ add this line
    name: i.name,
    quantity: i.quantity,
    price: i.price,
    imageUrl: i.imageUrl,
  }
    
    
    )),
      status: "processing",
      estimatedDelivery: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000
      ).toISOString(),
      createdAt: new Date().toISOString(),
    })

    // ✅ Return checkout URL
    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
