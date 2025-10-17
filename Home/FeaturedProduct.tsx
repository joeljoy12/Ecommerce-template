import { client } from "../sanity/lib/sanity.client"
import Image from "next/image"

async function getFeaturedProducts() {
  return client.fetch(`
    *[_type == "product" && featured == true]{
      _id,
      name,
      price,
      link,
      "imageUrl": image.asset->url
    }
  `)
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <section id="products" className="py-20 bg-[#F9FAFB]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-12 text-[#111111]">
          Featured Products
        </h2>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {products.map((product: any) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition"
            >
            <Image
  src={product.imageUrl && product.imageUrl.trim() !== "" 
        ? product.imageUrl 
        : "/placeholder.png"}
  alt={product.name || "Product image"}
  width={300}
  height={300}
  className="mx-auto rounded-lg object-cover"
  priority
/>

              <h3 className="mt-4 font-semibold text-lg text-[#111111]">
                {product.name}
              </h3>
              <p className="text-[#333333] mt-1">{product.price}</p>
              <a
                href={product.link || "#"}
                className="mt-4 inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-[#1F2937] transition"
              >
                Buy Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
