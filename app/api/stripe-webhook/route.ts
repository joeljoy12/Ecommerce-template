import { headers } from "next/headers"
import Stripe from "stripe"
import { writeClient } from "@/sanity/lib/sanityWriteClient"
import crypto from "crypto" // ✅ explicit import for randomUUID()

export const runtime = "nodejs" // ✅ ensures Node features work (like crypto, Buffer)

// ✅ Initialize Stripe with explicit API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

// ✅ The correct App Router route handler
export async function POST(req: Request) {
  const sig = (await headers()).get("stripe-signature")


  if (!sig) {
    return new Response("Missing Stripe signature", { status: 400 })
  }

  try {
    const body = await req.arrayBuffer()

    // ✅ Construct Stripe event from raw body
    const event = stripe.webhooks.constructEvent(
      Buffer.from(body),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )

    // ✅ Handle completed checkout sessions
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
      const address = session.customer_details?.address

      // ✅ Save order to Sanity
      await writeClient.create({
        _type: "order",
        stripeSessionId: session.id,
        email: session.customer_details?.email || "",
        total: (session.amount_total || 0) / 100,
        shippingAddress: {
          name: session.customer_details?.name || "",
          line1: address?.line1 || "",
          line2: address?.line2 || "",
          city: address?.city || "",
          state: address?.state || "",
          postalCode: address?.postal_code || "",
          country: address?.country || "",
        },
        items: lineItems.data.map((i) => ({
          _key: crypto.randomUUID(), // ✅ unique _key for each line item
          name: i.description,
          quantity: i.quantity,
          price: i.amount_total / 100,
        })),
        status: "processing",
        createdAt: new Date().toISOString(),
      })

      console.log("✅ Order saved:", session.id)
    }

    return new Response("OK", { status: 200 })
  } catch (err: any) {
    console.error("❌ Webhook Error:", err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }
}
