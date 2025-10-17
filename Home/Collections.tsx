import { client } from "../sanity/lib/sanity.client"
import Image from "next/image"

async function getCollections() {
  return client.fetch(`*[_type == "collection"]{_id, name, description, ctaText, ctaLink, "imageUrl": image.asset->url}`)
}

export default async function Collections() {
  const collections = await getCollections()

  return (
    <section id="collections" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">
          Shop by Collection
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {collections.map((col: any) => (
            <div
              key={col._id}
              className="bg-[#F8F5F0] rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={col.imageUrl}
                alt={col.name}
                width={400}
                height={300}
                className="w-full h-60 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="font-semibold text-xl mb-2">{col.name}</h3>
                <p className="text-[#6B7280] mb-4">{col.description}</p>
                <a
                  href={col.ctaLink}
                  className="inline-block px-6 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#b8952e] transition"
                >
                  {col.ctaText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
