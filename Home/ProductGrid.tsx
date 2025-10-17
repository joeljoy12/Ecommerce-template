// ./app/Home/ProductsGrid.tsx
import Image from "next/image"
import { client, urlFor } from "../sanity/lib/sanity.client"  // ✅ fixed path

const productsQuery = `*[_type == "product"]{
  _id,
  name,
  price,
  image,
  "slug": slug.current   // ✅ flatten slug
}`

export default async function ProductsGrid() {
  const products = await client.fetch(productsQuery)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {products.map((product: any) => (
            <div
              key={product._id}
              className="bg-[#F8F5F0] shadow-md rounded-lg p-6 text-center"
            >
              {product.image && (
                <Image
                  src={urlFor(product.image).width(400).url()}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="mx-auto rounded"
                />
              )}
              <h3 className="mt-4 font-semibold text-xl">{product.name}</h3>
              <p className="text-[#6B7280]">${product.price}</p>
              <a
                href={`/product/${product.slug}`}
                className="mt-4 inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-[#1F2937] transition"
              >
                View Product
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
