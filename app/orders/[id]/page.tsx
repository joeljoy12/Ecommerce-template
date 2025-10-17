"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Package, Truck, CheckCircle, Clock } from "lucide-react"
import { client } from "@/sanity/lib/sanity.client"

export default function OrderDetailsPage() {
  const { id } = useParams()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const data = await client.fetch(
          `*[_type == "order" && (stripeSessionId == $id || _id == $id)][0]{
            _id,
            stripeSessionId,
            email,
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
          { id }
        )

        if (!data) {
          setError("Order not found.")
          setOrder(null)
        } else {
          setOrder(data)
        }
      } catch (err: any) {
        console.error("Fetch error:", err)
        setError("Failed to fetch order.")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchOrder()
  }, [id])

  const steps = [
    { label: "Order Placed", icon: Package },
    { label: "Processing", icon: Clock },
    { label: "Shipped", icon: Truck },
    { label: "Delivered", icon: CheckCircle },
  ]

  const getStepStatus = (status: string, index: number) => {
    const map: Record<string, number> = {
      placed: 0,
      processing: 1,
      shipped: 2,
      delivered: 3,
    }
    return index <= (map[status] ?? 0)
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading order details...</p>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    )

  if (!order)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No order found.</p>
      </div>
    )

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fff8ec] via-white to-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg border border-gray-100 rounded-2xl p-8 justify-center items-center md:mt-30">
        {/* Header */}
        <h1 className="text-3xl font-serif font-bold text-center mb-2 md:mt-4">
          Order Tracking
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Tracking progress for order{" "}
          <span className="text-[#D4AF37] font-semibold">
            {order.stripeSessionId || order._id}
          </span>
        </p>

        {/* Order Info */}
        <div className="text-center mb-6">
          <p className="text-gray-700">
            <strong>Status:</strong>{" "}
            <span className="capitalize text-[#D4AF37]">
              {order.status || "processing"}
            </span>
          </p>
          <p className="text-gray-700">
            <strong>Total:</strong> ${order.total?.toFixed(2) || "0.00"}
          </p>
          <p className="text-gray-700">
            <strong>Estimated Delivery:</strong>{" "}
            {new Date(order.estimatedDelivery).toLocaleDateString()}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-0 mt-10">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isCompleted = getStepStatus(order.status, index)
            return (
              <div
                key={index}
                className="flex flex-col items-center relative md:w-1/4"
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-full border-2 ${
                    isCompleted
                      ? "border-[#D4AF37] bg-[#D4AF37]/10"
                      : "border-gray-300 bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-7 h-7 ${
                      isCompleted ? "text-[#D4AF37]" : "text-gray-400"
                    }`}
                  />
                </div>
                <p
                  className={`mt-2 text-sm font-medium ${
                    isCompleted ? "text-[#D4AF37]" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>

                {/* Line Connector */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute md:top-7 top-[85px] md:left-[calc(60%)] left-1/2 md:w-[calc(100%-2rem)] md:h-[2px] w-[2px] h-[30px] ${
                      isCompleted ? "bg-[#D4AF37]" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
