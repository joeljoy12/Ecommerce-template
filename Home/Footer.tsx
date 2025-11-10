"use client"

import { useEffect, useState } from "react"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { sanityFetch } from "@/sanity/lib/live"

type IconName = "facebook" | "instagram" | "twitter"

const query = `
  *[_type == "footer"][0]{
    _id,
    backgroundColor,
    textColor,
    borderColor,
    brand,
    links,
    newsletter,
    socials,
    copyright
  }
`

// ✅ Demo fallback footer (used if Sanity data missing)
const fallbackFooter = {
  backgroundColor: "#F8F5F0",
  textColor: "#111111",
  borderColor: "#E5E7EB",
  brand: {
    name: "LuxSkin",
    description: "Luxury skincare crafted with care and science.",
  },
  links: [
    { href: "#products", label: "Products" },
    { href: "#about", label: "About Us" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ],
  newsletter: {
    placeholder: "Enter your email",
    buttonBg: "#D4AF37",
    buttonHover: "#b8952e",
    buttonLabel: "Subscribe",
  },
  socials: [
    { icon: "facebook", href: "https://facebook.com" },
    { icon: "instagram", href: "https://instagram.com" },
    { icon: "twitter", href: "https://twitter.com" },
  ],
  copyright: "All rights reserved.",
}

export default function Footer() {
  const [footer, setFooter] = useState<any>(fallbackFooter)
  const [isFallback, setIsFallback] = useState(true)

  useEffect(() => {
    async function loadFooter() {
      try {
        const { data } = await sanityFetch({ query })
        if (data && Object.keys(data).length > 0) {
          console.log("✅ Live Sanity footer:", data)
          setFooter(data)
          setIsFallback(false)
        } else {
          console.warn("⚙️ No Sanity footer found — using fallback.")
          setIsFallback(true)
        }
      } catch (err) {
        console.error("❌ Live Footer fetch error:", err)
        setIsFallback(true)
      }
    }
    loadFooter()
  }, [])

  const renderIcon = (icon: IconName, href: string, i: number) => {
  const icons: Record<IconName, React.ReactNode> = {


      facebook: <Facebook size={20} />,
      instagram: <Instagram size={20} />,
      twitter: <Twitter size={20} />,
    }

    return (
      <a
        key={`social-${i}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-[#D4AF37] transition-colors"
      >
        {icons[icon]}
      </a>
    )
  }

  return (
    <footer
      className="py-12 border-t transition-colors duration-300"
      style={{
        backgroundColor: footer.backgroundColor?.hex || footer.backgroundColor,
        color: footer.textColor?.hex || footer.textColor,
        borderColor: footer.borderColor?.hex || footer.borderColor,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* 🏷 Brand Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">{footer.brand?.name}</h3>
          <p className="text-[#333333]">{footer.brand?.description}</p>
        </div>

        {/* 🔗 Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-[#333333]">
            {footer.links?.map((link: any, i: number) => (
              <li key={i}>
                <a href={link.href} className="hover:text-[#D4AF37]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 📨 Newsletter + Socials */}
        <div>
          <h4 className="font-semibold mb-4">Stay Updated</h4>
          <form className="flex">
            <input
              type="email"
              placeholder={footer.newsletter?.placeholder || "Enter your email"}
              className="px-4 py-2 rounded-l-lg text-black w-full border border-[#E5E7EB] focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-r-lg text-white transition-colors duration-200"
              style={{
                backgroundColor:
                  footer.newsletter?.buttonBg?.hex ||
                  footer.newsletter?.buttonBg,
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.backgroundColor =
                  footer.newsletter?.buttonHover?.hex ||
                  footer.newsletter?.buttonHover)
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.backgroundColor =
                  footer.newsletter?.buttonBg?.hex ||
                  footer.newsletter?.buttonBg)
              }
            >
              {footer.newsletter?.buttonLabel}
            </button>
          </form>

          <div className="flex space-x-4 mt-6 text-[#333333]">
            {footer.socials?.map((social: any, i: number) =>
              renderIcon(social.icon as IconName, social.href, i)
            )}
          </div>
        </div>
      </div>

      <div className="text-center text-[#6B7280] mt-10">
        © {new Date().getFullYear()} {footer.brand?.name}. {footer.copyright}
      </div>

      {isFallback && (
        <p className="text-center text-sm text-gray-400 mt-4">
          ⚙️ Showing demo footer (no Sanity data found)
        </p>
      )}
    </footer>
  )
}
