import { sanityFetch } from "@/sanity/lib/live"
import * as lucideIcons from "lucide-react"
import { LucideIcon } from "lucide-react"
import { DynamicIcon } from "lucide-react/dynamic" // optional (recommended)

const query = `
  *[_type == "benefit"][0]{
    title,
    backgroundColor,
    items[]{
      icon,
      heading,
      text
    }
  }
`

// ✅ Helper: convert dashed icon name to PascalCase for lucide-react
function getLucideIcon(name: string): LucideIcon {
  if (!name) return lucideIcons.Star

  const formatted = name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("")

  return (
    (lucideIcons[formatted as keyof typeof lucideIcons] as LucideIcon) ??
    lucideIcons.Star
  )
}

export default async function Benefits() {
  const { data: benefits } = await sanityFetch({ query })

  if (!benefits) {
    return <p className="text-center py-20">Benefits not set</p>
  }

  return (
    <section
      className="py-16"
      style={{ backgroundColor: benefits.backgroundColor?.hex || "#fff" }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 heading">{benefits.title}</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {benefits.items?.map((item: any, index: number) => {
            // ✅ If you want static icons:
            const Icon = getLucideIcon(item.icon)

            return (
              <div key={index} className="p-4">
                <div className="flex justify-center mb-4 text-[#D4AF37]">
                  {/* Option 1: Static lucide-react */}
                  {/* <Icon size={40} /> */}

                  {/* ✅ Option 2: Dynamic import (smaller bundle) */}
                  <DynamicIcon
                    name={item.icon}
                    size={40}
                    color="#D4AF37"
                  />
                </div>

                <h3 className="font-semibold text-xl heading text-[#111111]">
                  {item.heading}
                </h3>
                <p className="text-[#6B7280] mt-2">{item.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
