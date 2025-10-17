
"use client"

import { useEffect, useState } from "react"
import { Package, Truck, CheckCircle, Clock } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { client } from "@/sanity/lib/sanity.client"

interface Order {
  id: string
  date: string
  total: string
  status: "processing" | "shipped" | "delivered" | "pending"
  items: { imageUrl: string; name: string }[]
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  // ✅ Fetch real orders from Sanity
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "order"] | order(createdAt desc){
            _id,
            stripeSessionId,
            total,
            status,
            createdAt,
            items[] {
              name,
              imageUrl
            }
          }
        `)

        const formatted = data.map((order: any) => ({
          id: order.stripeSessionId || order._id,
          date: new Date(order.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          total: `$${order.total?.toFixed(2) || "0.00"}`,
          status: order.status || "processing",
          items: order.items || [],
        }))

        setOrders(formatted)
      } catch (err) {
        console.error(err)
        setError("Failed to load orders.")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-600" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      default:
        return <Package className="w-5 h-5 text-gray-400" />
    }
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading your orders...</p>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    )

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fff8ec] via-white to-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-12 text-center mt-6">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center mt-24">
            <p className="text-gray-500 text-lg">
              You haven’t placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all p-6 flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>

                {/* Order Info */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-1">
                    Order ID:{" "}
                    <span
                      className="text-[#D4AF37] font-medium truncate max-w-[150px] inline-block align-bottom"
                      title={order.id}
                    >
                      {order.id.length > 15
                        ? order.id.slice(0, 12) + "..."
                        : order.id}
                    </span>
                  </h2>
                  <p className="text-gray-700 text-base font-medium mb-4">
                    Total:{" "}
                    <span className="text-[#D4AF37]">{order.total}</span>
                  </p>

                  {/* Product Thumbnails */}
                  <div className="flex -space-x-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="relative w-12 h-12">
                        <Image
                          src={item.imageUrl || "/placeholder.png"}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="rounded-full border-2 border-white object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => router.push(`/orders/${order.id}`)}
                  className="mt-8 bg-[#D4AF37] hover:bg-[#b8952e] text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Track Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
