"use client"

import { useCartStore } from "@/store/cartStore"
import { useRouter } from "next/navigation"
import { ShoppingCart, ArrowRight, Trash2, Plus, Minus } from "lucide-react"
import Image from "next/image"

interface CartItem {
  _id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCartStore()
  const router = useRouter()

  // ✅ Empty cart
  if (!items.length) {
    return (
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 mt-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 max-w-lg w-full text-center shadow-xl border border-gray-100 sm:w-3/4">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-[#f8f5ec] to-[#faf9f4] p-8 rounded-full shadow-inner">
              <ShoppingCart className="w-16 h-16 text-[#D4AF37]" strokeWidth={1.5} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-tight mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto mb-8">
            It looks like you haven’t added anything yet. Discover our{" "}
            <span className="text-[#D4AF37] font-semibold">premium collection</span> and
            start your journey today.
          </p>

          {/* CTA */}
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-3 bg-[#D4AF37] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#b8952e] transition-all shadow-md hover:shadow-lg text-lg"
          >
            Continue Shopping
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>
    )
  }

  const total = items.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  )

const handleCheckout = async () => {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    })

    // 🧩 Catch non-JSON / HTML responses
    const contentType = res.headers.get("content-type") || ""
    if (!contentType.includes("application/json")) {
      const text = await res.text()
      console.error("Checkout failed. Non-JSON response:", text)
      alert("Checkout failed. Check console for details.")
      return
    }

    const data = await res.json()

    if (!res.ok) {
      console.error("Checkout API Error:", data.error || data)
      alert("Checkout failed. Please try again.")
      return
    }

    if (data.url) {
      window.location.href = data.url
    } else {
      console.error("Checkout error:", data.error)
      alert("Checkout failed. Please try again.")
    }
  } catch (err) {
    console.error("Error starting checkout:", err)
    alert("Something went wrong. Try again later.")
  }
}


  // ✅ Cart with items
  return (
    <section className="max-w-5xl mx-auto p-6 pb-28 sm:pb-12">
      <h1 className="text-4xl font-serif font-bold mb-10 text-gray-900 tracking-tight mt-26">
        Shopping Cart
      </h1>

      <div className="space-y-6">
        {items.map((item: CartItem) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row justify-between items-center border border-gray-100 p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all"
          >
            {/* Product Info */}
            <div className="flex items-center gap-5 w-full sm:w-auto mb-4 sm:mb-0">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-xl shadow-sm"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-600 mt-1">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between ">
              {/* Stepper */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:text-[#D4AF37] transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:text-[#D4AF37] transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 className="w-5 h-5" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Checkout Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex sm:hidden justify-between items-center shadow-lg">
        <span className="font-bold text-lg text-gray-900">Total: ${total.toFixed(2)}</span>
        <button
          onClick={handleCheckout}
          className="bg-[#D4AF37] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#b8952e] transition"
        >
          Checkout
        </button>
      </div>

      {/* Total + Checkout (Desktop) */}
      <div className="hidden sm:flex mt-10 bg-white border border-gray-100 rounded-2xl shadow-md p-6 justify-between items-center text-xl font-bold text-gray-900">
        <span>Total</span>
        <span className="text-[#D4AF37]">${total.toFixed(2)}</span>
      </div>

      <button
        onClick={handleCheckout}
        className="hidden sm:block mt-8 w-full bg-[#D4AF37] text-white py-4 rounded-xl text-lg font-semibold hover:bg-[#b8952e] transition-all shadow-md hover:shadow-xl"
      >
        Proceed to Checkout
      </button>
    </section>
  )
}
