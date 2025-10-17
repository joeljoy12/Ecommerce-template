"use client"
import { useCartStore } from "@/store/cartStore"
import { useState } from "react"

export default function AddToCartButton({ product }: { product: any }) {
  const addToCart = useCartStore((state) => state.addToCart)
  const [qty, setQty] = useState(1)

  return (
    <div className="mt-6 space-y-4">
      {/* Quantity Stepper */}
      <div className="flex items-center justify-start border rounded-lg overflow-hidden shadow-sm w-fit">
        <button
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
        >
          –
        </button>
        <span className="px-6 py-2 min-w-[50px] text-center font-medium">
          {qty}
        </span>
        <button
          onClick={() => setQty(qty + 1)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() =>
          addToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: qty,
          })
        }
        className="w-full px-6 py-3 bg-[#d4b137] text-white rounded-lg font-semibold shadow-md hover:bg-[#b8952e] transition"
      >
        Add to Cart
      </button>
    </div>
  )
}
