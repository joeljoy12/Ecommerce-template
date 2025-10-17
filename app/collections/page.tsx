"use client"

import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/sanity.client"
import Image from "next/image"
import Link from "next/link"

async function getProducts() {
  return client.fetch(`
    *[_type == "product"]{
      _id,
      name,
      price,
      "imageUrl": imageGallery[0].asset->url,
      slug
    }
  `)
}

export default function Page() {
  const [products, setProducts] = useState<any[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    getProducts().then((data) => {
      if (data && data.length > 0) setProducts(data)
    })
  }, [])

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section id="collections" className="py-24 bg-gradient-to-b from-white to-[#fffaf2]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-[#1a1a1a]">
          Our Exclusive Collection
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-14">
          <input
            type="text"
            placeholder="Search your favorite product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-5 py-3 border border-gray-300 rounded-full shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-gray-700"
          />
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <Link
              href={`/product/${product.slug?.current || ""}`}
              key={product._id}
              className="group relative bg-white border border-gray-300 rounded-3xl overflow-hidden 
                shadow-[0_6px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.3)]
                transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Product Info */}
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                  {product.name}
                </h3>
                <p className="mt-2 text-xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#b8952e] bg-clip-text text-transparent">
                  ${product.price}
                </p>

                <div className="mt-5">
                  <span
                    className="inline-block px-6 py-2 text-sm font-medium rounded-full border border-[#D4AF37]
                      text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-300"
                  >
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-16 text-lg">No products found.</p>
        )}
      </div>
    </section>
  )
}
