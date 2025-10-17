import { NextResponse } from "next/server"
import { client } from "@/sanity/lib/sanity.client"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // ✅ Fetch all orders for this email (latest first)
    const orders = await client.fetch(
      `*[_type == "order" && email == $email] | order(createdAt desc){
        _id,
        stripeSessionId,
        total,
        status,
        createdAt,
        estimatedDelivery,
        items[]{
          name,
          imageUrl,
          quantity,
          price
        }
      }`,
      { email }
    )

    if (!orders || orders.length === 0) {
      return NextResponse.json({ error: "No orders found for this email." }, { status: 404 })
    }

    return NextResponse.json({ orders })
  } catch (err: any) {
    console.error("Email order lookup error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
