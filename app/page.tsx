import { client } from "@/sanity/lib/sanity.client"
import Image from "next/image"
import Home from "./Home"

async function getHero() {
  return client.fetch(`
    *[_type == "hero"][0]{
      heading,
      subheading,
      cta,
      backgroundColor,
      "imageUrl": image.asset->url
    }
  `)
}

export default async function Page() {
  const hero = await getHero()

  if (!hero) {
    return <div className="text-center py-20">Hero section not set</div>
  }

  return (
    <section style={{ backgroundColor: hero.backgroundColor || "#fff" }}>
      <div className="max-w-6xl mx-auto px-6 py-28 grid md:grid-cols-2 items-center gap-12">
        {/* Left Side - Text */}
        <div>
          <h1 className="heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#111111] md:mt-18">
            {hero.heading}
          </h1>
          <p className="text-base sm:text-lg text-[#6B7280] mb-8 max-w-md">
            {hero.subheading}
          </p>
          {hero.cta && (
            <a
              href={hero.cta.href}
              className="inline-block px-10 py-3 font-medium rounded-lg transition hover:scale-105"
              style={{
                backgroundColor: hero.cta.bgColor || "#D4AF37",
                color: hero.cta.textColor || "#fff",
              }}
            >
              {hero.cta.label}
            </a>
          )}
        </div>

        {/* Right Side - Image */}
        {hero.imageUrl && (
          <div className="flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-square">
              <Image
                src={hero.imageUrl}
                alt={hero.heading || "Hero image"}
                fill
                className="object-cover rounded-lg mt-10"
                priority
                  fetchPriority="high"
              />
            </div>
          </div>
        )}
      </div>

     {/* 👇 Elegant gray border at the end */}





      <Home />

 
    </section>
  )
}
