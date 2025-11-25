import Image from "next/image"
import Home from "./Home"
import { sanityFetch } from "@/sanity/lib/live"
import { draftMode } from "next/headers"

const heroQuery = `
  *[_type == "hero"][0]{
    heading,
    subheading,
    cta,
    cta2,
    backgroundColor,
    "imageUrl": image.asset->url
  }
`

export default async function Page() {
  // ✅ Check if draft mode is enabled
  const { isEnabled } = await draftMode()

  // ✅ Fetch hero data (live-editable only in draft mode)
  const { data: hero } = await sanityFetch({
    query: heroQuery,
    perspective: isEnabled ? "previewDrafts" : "published",
  })

  if (!hero) {
    return <div className="text-center py-20">Hero section not set</div>
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: hero.backgroundColor?.hex || "#ffffff",
      }}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-24">
        <div className="flex flex-wrap items-center">
         
{/*=======================================   📝 Left Column (Text)     ======================================================= */ }
         
         
          <div className="w-full px-4 lg:w-5/12 lg:mb-24 ">
            <div className="space-y-6 text-center lg:text-left lg:ml-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#111111] ">
                {hero.heading}
              </h1>

              <p className="text-base sm:text-lg text-[#6B7280] max-w-md mx-auto lg:mx-0">
                {hero.subheading}
              </p>

              {hero.cta && (
                <a
                  href={hero.cta.href}
                  className="inline-block px-8 py-3 font-medium rounded-lg transition transform hover:scale-105"
                  style={{
                    backgroundColor: hero.cta.bgColor?.hex || "#D4AF37",
                    color: hero.cta.textColor?.hex || "#fff",
                  }}
                >
                  {hero.cta.label}
                </a>
              )}


               {/* Secondary CTA */}
  {hero.cta2 && (
    <a
      href={hero.cta2.href}
      className="inline-block px-8 py-3 font-medium rounded-lg transition transform hover:scale-105 border ml-2"
      style={{
        backgroundColor: hero.cta2.bgColor?.hex || "#fff",
        color: hero.cta2.textColor?.hex || "#111",
      }}
    >
      {hero.cta2.label}
    </a>
  )}


            </div>
          </div>

{/*================================    Spacer (center gap for large screens)  ====================================================== */}
         
          <div className="hidden lg:block lg:w-1/12"></div>

          {/* 🖼️ Right Column (Image) */}
          
      {hero.imageUrl && (
  <div className="w-full px-4 lg:w-6/12">
    <div className="relative w-full max-w-md aspect-[4/5] mx-auto lg:ml-auto">

      {/* Constant fixed-ratio image */}
      <Image
        src={hero.imageUrl}
        alt={hero.heading || "Hero image"}
        fill
        className="object-cover rounded-2xl shadow-md"
        priority
      />

      {/* Decorative dots */}
      <span className="absolute -bottom-8 -left-8 z-[-1]">
        <svg
          width="93"
          height="93"
          viewBox="0 0 93 93"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[...Array(5)].map((_, row) =>
            [...Array(5)].map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={2.5 + 22 * col}
                cy={2.5 + 22 * row}
                r="2.5"
                fill="#D4AF37"
              />
            ))
          )}
        </svg>
      </span>

    </div>
  </div>
)}


  {/*====================================================v Decorative dotted background   =======================================  */}
                <span className="absolute -bottom-8 -left-8 z-[-1]">
                  <svg
                    width="93"
                    height="93"
                    viewBox="0 0 93 93"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {[...Array(5)].map((_, row) =>
                      [...Array(5)].map((_, col) => (
                        <circle
                          key={`${row}-${col}`}
                          cx={2.5 + 22 * col}
                          cy={2.5 + 22 * row}
                          r="2.5"
                          fill="#D4AF37"
                        />
                      ))
                    )}
                  </svg>
                </span>
              </div>
            </div>
          

      {/* 👇==========================================     Include your Home section after Hero    ========================================== */}
      <Home />
    </section>
  )
}
