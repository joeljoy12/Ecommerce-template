"use client"

import { Facebook, Instagram, Twitter } from "lucide-react"
import { client } from "../sanity/lib/sanity.client"
import { useEffect, useState } from "react"

type IconName = "facebook" | "instagram" | "twitter"

async function getFooter() {
  return client.fetch(`*[_type == "footer"][0]`)
}

export default function Footer() {
  const [footer, setFooter] = useState<any>(null)

  // ✅ Demo fallback if no data in Sanity
  const demo = {
    backgroundColor: "#F8F5F0",
    textColor: "#111111",
    borderColor: "#E5E7EB",
    brand: {
      name: "LuxSkin",
      description: "Luxury skincare crafted with care and science."
    },
    links: [
      { href: "#products", label: "Products" },
      { href: "#about", label: "About Us" },
      { href: "#faq", label: "FAQ" },
      { href: "#contact", label: "Contact" }
    ],
    newsletter: {
      placeholder: "Enter your email",
      buttonBg: "#D4AF37",
      buttonHover: "#b8952e",
      buttonLabel: "Subscribe"
    },
    socials: [
      { icon: "facebook", href: "https://facebook.com" },
      { icon: "instagram", href: "https://instagram.com" },
      { icon: "twitter", href: "https://twitter.com" }
    ],
    copyright: "All rights reserved."
  }

  useEffect(() => {
    getFooter().then((data) => setFooter(data || demo))
  }, [])

  if (!footer) return null

  const renderIcon = (icon: IconName, href: string, i: number) => {
    const iconProps = { size: 20 }
    switch (icon) {
      case "facebook":
        return (
          <a key={i} href={href} className="hover:text-[#D4AF37]">
            <Facebook {...iconProps} />
          </a>
        )
      case "instagram":
        return (
          <a key={i} href={href} className="hover:text-[#D4AF37]">
            <Instagram {...iconProps} />
          </a>
        )
      case "twitter":
        return (
          <a key={i} href={href} className="hover:text-[#D4AF37]">
            <Twitter {...iconProps} />
          </a>
        )
      default:
        return null
    }
  }

  return (
    <footer
      className="py-12 border-t"
      style={{
        backgroundColor: footer.backgroundColor,
        color: footer.textColor,
        borderColor: footer.borderColor,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">{footer.brand.name}</h3>
          <p className="text-[#333333]">{footer.brand.description}</p>
        </div>

        {/* Quick Links */}
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

        {/* Newsletter + Socials */}
        <div>
          <h4 className="font-semibold mb-4">Stay Updated</h4>
          <form className="flex">
            <input
              type="email"
              placeholder={footer.newsletter.placeholder}
              className="px-4 py-2 rounded-l-lg text-black w-full border border-[#E5E7EB] focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-r-lg text-white transition"
              style={{ backgroundColor: footer.newsletter.buttonBg }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.backgroundColor =
                  footer.newsletter.buttonHover)
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.backgroundColor =
                  footer.newsletter.buttonBg)
              }
            >
              {footer.newsletter.buttonLabel}
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
        © {new Date().getFullYear()} {footer.brand.name}. {footer.copyright}
      </div>
    </footer>
  )
}
