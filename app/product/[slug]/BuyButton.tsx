"use client"

import { useState } from "react"

export default function BuyButton({
  product,
  quantity = 1,
}: {
  product: any
  quantity?: number
}) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [
            {
              name: product.name,
              price: product.price,
              imageUrl: product.imageGallery?.[0] || product.imageUrl || "/placeholder.png",
              quantity,
            },
          ],
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || "Checkout failed")
      }

      window.location.href = data.url
    } catch (err) {
      console.error("Error starting checkout:", err)
      alert("Checkout failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="px-6 py-3 bg-[#D4AF37] text-white rounded-lg hover:bg-[#b8952e] transition disabled:opacity-50 -mt-6"
    >
      {loading ? "Redirecting..." : "Buy Now"}
    </button>
  )
}
