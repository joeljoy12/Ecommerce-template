import { client } from "../sanity/lib/sanity.client"
import Image from "next/image"
import Link from "next/link"

async function getFeaturedProducts() {
  return client.fetch(`
    *[_type == "product" && featured == true]{
      _id,
      name,
      price,
      link,
      "slug": slug,
      "imageUrl": imageGallery[0].asset->url
    }
  `)
}


export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <section id="products" className="py-20 ">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-12 text-[#111111]">
          Featured Products
        </h2>

      {/* Products Grid */}
<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
  {products.map((product: any) => (
    <Link
      key={product._id}
      href={`/product/${product.slug?.current || ""}`}
      className="group relative bg-white border border-gray-200 rounded-3xl overflow-hidden 
        shadow-[0_6px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)]
        transition-all duration-500 transform hover:-translate-y-2"
    >
      {/* Product Image */}
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={
            product.imageUrl && product.imageUrl.trim() !== ""
              ? product.imageUrl
              : "/placeholder.png"
          }
          alt={product.name || "Product image"}
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

      </div>
    </section>
  )
}
