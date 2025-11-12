import Image from "next/image"
import { cache } from "react"
import Home from "./Home"
import { sanityFetch } from "@/sanity/lib/live"

// ========================================
// TYPES
// ========================================
interface CTAData {
  label: string
  href: string
  bgColor?: { hex: string }
  textColor?: { hex: string }
}

interface HeroData {
  heading: string
  subheading: string
  cta?: CTAData
  backgroundColor?: { hex: string }
  imageUrl?: string
}

// ========================================
// CONSTANTS
// ========================================
const HERO_QUERY = `
  *[_type == "hero"][0]{
    heading,
    subheading,
    cta,
    backgroundColor,
    "imageUrl": image.asset->url
  }
` as const

const COLORS = {
  background: "#ffffff",
  ctaBackground: "#D4AF37",
  ctaText: "#ffffff",
  accent: "#D4AF37",
  heading: "#111111",
  subheading: "#6B7280",
} as const

const GRID_SIZE = 5

// ========================================
// CACHED DATA FETCHING
// ========================================
const getHeroData = cache(async (perspective: "published" | "previewDrafts") => {
  return sanityFetch<HeroData>({
    query: HERO_QUERY,
    perspective,
  })
})

// ========================================
// SUBCOMPONENTS
// ========================================
const HeroCTA = ({ cta }: { cta: CTAData }) => (
  <a
    href={cta.href}
    className="inline-block px-8 py-3 font-medium rounded-lg transition transform hover:scale-105"
    style={{
      backgroundColor: cta.bgColor?.hex ?? COLORS.ctaBackground,
      color: cta.textColor?.hex ?? COLORS.ctaText,
    }}
    aria-label={cta.label}
  >
    {cta.label}
  </a>
)

const HeroContent = ({ hero }: { hero: HeroData }) => (
  <div className="w-full px-4 lg:w-5/12 md:-mt-30">
    <div className="space-y-6 text-center lg:text-left">
      <h1 
        className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
        style={{ color: COLORS.heading }}
      >
        {hero.heading}
      </h1>

      <p 
        className="text-base sm:text-lg max-w-md mx-auto lg:mx-0"
        style={{ color: COLORS.subheading }}
      >
        {hero.subheading}
      </p>

      {hero.cta && <HeroCTA cta={hero.cta} />}
    </div>
  </div>
)

const DecorativeDots = () => {
  const dots = []
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={2.5 + 22 * col}
          cy={2.5 + 22 * row}
          r="2.5"
          fill={COLORS.accent}
        />
      )
    }
  }

  return (
    <span className="absolute -bottom-8 -left-8 z-[-1]" aria-hidden="true">
      <svg
        width="93"
        height="93"
        viewBox="0 0 93 93"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {dots}
      </svg>
    </span>
  )
}

const HeroImage = ({ imageUrl, heading }: { imageUrl: string; heading: string }) => (
  <div className="w-full px-4 lg:w-6/12">
    <div className="relative z-10 inline-block pt-10 lg:pt-0">
      <Image
        src={imageUrl}
        alt={heading}
        width={600}
        height={600}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        className="rounded-2xl shadow-md mx-auto lg:ml-auto"
        priority
      />
      <DecorativeDots />
    </div>
  </div>
)

const EmptyState = () => (
  <div className="text-center py-20">
    <p className="text-lg text-gray-600">Hero section not configured</p>
  </div>
)

// ========================================
// MAIN COMPONENT
// ========================================
export default async function Page() {
  // Fetch hero data with appropriate perspective
  const { data: hero } = await getHeroData("published")

  if (!hero) {
    return <EmptyState />
  }

  return (
    <>
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: hero.backgroundColor?.hex ?? COLORS.background }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-24">
          <div className="flex flex-wrap items-center -mx-4">
            <HeroContent hero={hero} />
            
            {/* Spacer for large screens */}
            <div className="hidden lg:block lg:w-1/12" aria-hidden="true" />
            
            {hero.imageUrl && (
              <HeroImage imageUrl={hero.imageUrl} heading={hero.heading} />
            )}
          </div>
        </div>
      </section>

      <Home />
    </>
  )
}
