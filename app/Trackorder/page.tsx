"use client"

import { useState } from "react"
import { Package, Truck, CheckCircle, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TrackOrderPage() {
  const [email, setEmail] = useState("")
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const fetchOrdersByEmail = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/orders/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "No orders found")
      setOrders(data.orders)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fff8ec] via-white to-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-center mb-10 mt-8">
          Track Your Orders
        </h1>

        {/* Email Input */}
        <div className="bg-white shadow-lg border border-gray-100 rounded-2xl p-6 mb-8">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] mb-4"
          />
          <button
            onClick={fetchOrdersByEmail}
            disabled={loading || !email}
            className="w-full bg-[#D4AF37] text-white py-3 rounded-lg font-semibold hover:bg-[#b8952e] transition disabled:opacity-60"
          >
            {loading ? "Fetching Orders..." : "Find Orders"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="text-center text-red-600 font-medium mb-8">{error}</div>
        )}

        {/* Orders List */}
        {orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-gray-100 rounded-2xl shadow-md p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Order ID:
                    <span className="text-[#D4AF37] ml-2 font-medium">
                      {order.stripeSessionId || order._id}
                    </span>
                  </h3>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">
                  <strong>Total:</strong> ${order.total?.toFixed(2) || "0.00"}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <button
                  onClick={() =>
                    router.push(`/orders/${order.stripeSessionId || order._id}`)
                  }
                  className="w-full bg-[#D4AF37] hover:bg-[#b8952e] text-white py-2 rounded-lg font-semibold transition"
                >
                  Track This Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
