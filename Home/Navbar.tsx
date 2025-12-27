"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/live"


const query = `
  *[_type == "navbar"][0]{
    backgroundColor,
    textColor,
    highlightColor,
    highlightHover,
    logo,
    links,
    cta,
    "logoUrl": logoImage.asset->url,
    "logoAlt": logoImage.alt
  }
`


// 🎨 LuxSkin Fallback (from your JSON)
const fallbackNavbar = {
  backgroundColor: "#F8F5F0",
  textColor: "#111111",
  highlightColor: "#D4AF37",
  highlightHover: "#B8860B",
  logo: {
    highlight: "Lux",
    rest: "Skin",
  },
  links: [
    { label: "Collections", href: "#collections" },
    { label: "New Arrivals", href: "#new-arrivals" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  cta: {
    cart: { label: "Cart", href: "/cart" },
    signup: { label: "Get Started", href: "/signup" },
  },
}

export default function Navbar() {
  const [navbar, setNavbar] = useState<any>(fallbackNavbar)
  const [isFallback, setIsFallback] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    async function loadNavbar() {
      try {
        const { data } = await sanityFetch({ query })
        if (data) {
          console.log("✅ Live Sanity Navbar:", data)
          setNavbar({ ...fallbackNavbar, ...data })
          setIsFallback(false)
        } else {
          console.warn("⚙️ Using fallback navbar (no Sanity data found)")
          setIsFallback(true)
        }
      } catch (err) {
        setIsFallback(true)
      }
    }
    loadNavbar()
  }, [])

  const bg = navbar.backgroundColor?.hex || navbar.backgroundColor
  const text = navbar.textColor?.hex || navbar.textColor
  const highlight = navbar.highlightColor?.hex || navbar.highlightColor
  const hover = navbar.highlightHover?.hex || navbar.highlightHover

  return (
    <header
      className="shadow-md fixed top-0 left-0 w-full z-50 transition-colors duration-300"
      style={{ backgroundColor: bg }}
    >
      <div className="max-w-6xl mx-auto flex flex-wrap p-5 flex-row items-center justify-between">
        {/* 🪞 Logo */}
        <Link href="/" className="flex items-center">
  {navbar.logoUrl ? (
    <img
      src={navbar.logoUrl}
      alt={navbar.logoAlt || "Logo"}
      className="h-10 w-auto object-contain"
    />
  ) : (
    <span
      className="font-bold text-2xl tracking-tight"
      style={{ color: text }}
    >
      <span style={{ color: highlight }}>
        {navbar.logo?.highlight || "Lux"}
      </span>
      {navbar.logo?.rest || "Skin"}
    </span>
  )}
</Link>


        {/* 🖥 Desktop Nav */}
        <nav
          className="hidden md:flex space-x-8 text-base font-medium"
          style={{ color: text }}
        >
          {navbar.links?.map((link: any, i: number) => (
            <Link
              key={i}
              href={link.href || "#"}
              className="transition"
              style={{ color: text }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = highlight)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = text)
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 💎 CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href={navbar.cta?.cart?.href || "#"}
            className="inline-flex items-center px-4 py-2 rounded-lg transition"
            style={{
              color: highlight,
              border: `1px solid ${highlight}`,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = highlight
              e.currentTarget.style.color = "#fff"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.color = highlight
            }}
          >
            {navbar.cta?.cart?.label || "Cart"}
          </Link>
          <Link
            href={navbar.cta?.signup?.href || "#"}
            className="inline-flex items-center px-4 py-2 text-white rounded-lg transition"
            style={{ backgroundColor: highlight }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = hover)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = highlight)
            }
          >
            {navbar.cta?.signup?.label || "Get Started"}
          </Link>
        </div>

        {/* 📱 Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
          style={{ color: text }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* 📱 Mobile Nav */}
      {isOpen && (
        <nav
          className="md:hidden shadow-lg px-6 py-4 space-y-3 transition-colors duration-300"
          style={{ backgroundColor: bg }}
        >
          {navbar.links?.map((link: any, i: number) => (
            <Link
              key={i}
              href={link.href || "#"}
              className="block transition"
              style={{ color: text }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = highlight)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = text)
              }
            >
              {link.label}
            </Link>
          ))}

          <div className="flex space-x-4 pt-4">
            <Link
              href={navbar.cta?.cart?.href || "#"}
              className="w-1/2 text-center px-4 py-2 rounded-lg transition"
              style={{
                color: highlight,
                border: `1px solid ${highlight}`,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = highlight
                e.currentTarget.style.color = "#fff"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = highlight
              }}
            >
              {navbar.cta?.cart?.label || "Cart"}
            </Link>
            <Link
              href={navbar.cta?.signup?.href || "#"}
              className="w-1/2 text-center px-4 py-2 text-white rounded-lg transition"
              style={{ backgroundColor: highlight }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = hover)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = highlight)
              }
            >
              {navbar.cta?.signup?.label || "Get Started"}
            </Link>
          </div>
        </nav>
      )}

     
      
    </header>
  )
}
