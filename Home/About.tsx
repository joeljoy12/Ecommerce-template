import { client } from "@/sanity/lib/sanity.client"
import Image from "next/image"

async function getAbout() {
  return client.fetch(`
    *[_type == "about"][0]{
      title,
      paragraphs,
      ctaText,
      ctaLink,
      "imageUrl": image.asset->url
    }
  `)
}

export default async function About() {
  const about = await getAbout()

  if (!about) {
    return <div className="text-center py-20">About section not set</div>
  }

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left - Image */}
        {about.imageUrl && (
          <div className="flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-square">
              <Image
                src={about.imageUrl}
                alt={about.title || "About image"}
                fill
                className="object-cover rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        )}

        {/* Right - Text */}
        <div>
          <h2 className="font-serif text-4xl font-bold text-[#111111] mb-6">
            {about.title}
          </h2>

          {about.paragraphs?.map((para: string, idx: number) => (
            <p key={idx} className="text-lg text-[#6B7280] leading-relaxed mb-6">
              {para}
            </p>
          ))}

          {about.ctaText && about.ctaLink && (
            <a
              href={about.ctaLink}
              className="inline-block px-8 py-3 bg-[#D4AF37] text-white rounded-lg hover:bg-[#b8952e] transition"
            >
              {about.ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
