"use client"

import { useEffect, useState } from "react"
import * as lucideIcons from "lucide-react"
import { DynamicIcon } from "lucide-react/dynamic"
import { sanityFetch } from "@/sanity/lib/live"

const query = `
  *[_type == "benefit"][0]{
    title,
    backgroundColor,
    items[] { icon, heading, text }
  }
`

export default function Benefits() {
  const [benefits, setBenefits] = useState<any>(null)

  useEffect(() => {
    sanityFetch({ query }).then((res) => setBenefits(res.data))
  }, [])

  if (!benefits) return <p className="text-center py-20">Loading...</p>

  return (
    <section
      className="py-16"
      style={{ backgroundColor: benefits.backgroundColor?.hex || "#fff" }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 heading">{benefits.title}</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {benefits.items?.map((item: any, index: number) => (
            <div key={index} className="p-4">
              <div className="flex justify-center mb-4 text-[#D4AF37]">
                <DynamicIcon name={item.icon} size={40} color="#D4AF37" />
              </div>

              <h3 className="font-semibold text-xl heading text-[#111111]">
                {item.heading}
              </h3>
              <p className="text-[#6B7280] mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
