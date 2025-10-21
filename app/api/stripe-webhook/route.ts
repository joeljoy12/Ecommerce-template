import { buffer } from "micro"
import Stripe from "stripe"
import type { NextApiRequest, NextApiResponse } from "next"
import { writeClient } from "@/sanity/lib/sanityWriteClient"

export const config = { api: { bodyParser: false } }

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed")
  }

  const sig = req.headers["stripe-signature"]
  if (!sig) {
    return res.status(400).send("Missing Stripe signature")
  }

  const buf = await buffer(req)

  try {
    const event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
      const address = session.customer_details?.address

      await writeClient.create({
        _type: "order",
        stripeSessionId: session.id,
        email: session.customer_details?.email,
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
          _key: crypto.randomUUID(),
          name: i.description,
          quantity: i.quantity,
          price: i.amount_total / 100,
        })),
        status: "processing",
        createdAt: new Date().toISOString(),
      })

      console.log("✅ Order saved:", session.id)
    }

    res.status(200).send("OK")
  } catch (err: any) {
    console.error("❌ Webhook Error:", err.message)
    res.status(400).send(`Webhook Error: ${err.message}`)
  }
}
