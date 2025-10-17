"use client"

import Image from "next/image"
import { useState } from "react"
import { useCartStore } from "@/store/cartStore"
import BuyButton from "./BuyButton"

export default function ProductPage({
  product,
  quantity,
}: {
  product: any
  quantity: number
}) {
  const [qty, setQty] = useState(1)
  const addToCart = useCartStore((state) => state.addToCart)

  if (!product) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Product not found</h2>
          <p className="text-gray-500">The item you're looking for doesn't exist</p>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen py-16 md:py-24 bg-gradient-to-br from-[#fff8ec] via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Main Image */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <div className="relative border-2 border-gray-100 rounded-3xl overflow-hidden shadow-2xl shadow-[#D4AF37]/10 hover:shadow-[#D4AF37]/20 transition-all duration-500 bg-white max-w-lg lg:max-w-3xl xl:max-w-4xl lg:max-h-[600px] mx-auto">
                <Image
                  src={product.imageGallery?.[0] || "/placeholder.png"}
                  alt={product.name}
                  width={900}
                  height={900}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
              {(product.imageGallery && product.imageGallery.length > 0
                ? product.imageGallery
                : ["/placeholder.png"]
              ).map((img: string, idx: number) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 border-2 border-gray-200 hover:border-[#D4AF37] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg shadow-[#D4AF37]/10 bg-white"
                >
                  <Image
                    src={img || "/placeholder.png"}
                    alt={`${product.name || "Product"} thumbnail ${idx + 1}`}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center space-y-8 lg:pt-8">
            <div className="space-y-4">
              <h1 className="heading text-4xl md:text-6xl lg:text-6xl font-bold text-[#111111] font-serif leading-tight tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3">
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#b8952e] bg-clip-text text-transparent">
                  ${product.price}
                </p>
                <span className="text-sm text-gray-500 uppercase tracking-wider">USD</span>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-[#f0dca8] via-[#D4AF37] to-transparent"></div>

            <p className="text-lg text-gray-600 leading-relaxed">
              {product.description || "This is a premium product crafted with luxury and care."}
            </p>

            <div className="mt-6 space-y-4">
              {/* Quantity Stepper */}
              <div className="flex items-center justify-start border rounded-lg overflow-hidden shadow-sm w-fit">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
                >
                  –
                </button>
                <span className="px-6 py-2 min-w-[50px] text-center font-medium">{qty}</span>
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
                    imageUrl: product.imageGallery?.[0] || "/placeholder.png",
                    quantity: qty,
                  })
                }
                className="w-full text-[#D4AF37] hover:text-white border border-[#D4AF37] hover:bg-[#b8952e] focus:ring-1 focus:outline-none focus:ring-[#f0dca8] font-medium rounded-lg text-sm text-center px-6 py-3"
              >
                Add to Cart
              </button>
            </div>

            {/* Buy Now */}
            <BuyButton product={product} />

            <div className="flex gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>In Stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
