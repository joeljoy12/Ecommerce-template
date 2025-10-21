import { NextResponse } from "next/server";
import Stripe from "stripe";
import { writeClient } from "@/sanity/lib/sanityWriteClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const sig = req.headers.get("stripe-signature");
    if (!sig) {
      return NextResponse.json(
        { error: "Missing Stripe signature" },
        { status: 400 }
      );
    }

    // Read raw body buffer from the request
    const buf = Buffer.from(await req.arrayBuffer());

    // Verify and construct the event
    const event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Handle checkout completion
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const address = session.customer_details?.address;

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
      });

      console.log("✅ Order saved:", session.id);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ Webhook Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
