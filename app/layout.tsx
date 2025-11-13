import type { Metadata } from "next"
import "./globals.css"
import { Inter, Playfair_Display } from "next/font/google"
import { client } from "@/sanity/lib/sanity.client"
import { draftMode } from "next/headers"
import { DisableDraftMode } from "./components/DisableDraftMode"
import { VisualEditing } from "next-sanity/visual-editing"
import { SanityLive } from "@/sanity/lib/live"
import ClientLayoutWrapper from "./components/ClientLayoutWrapper" 

// ✅ Dynamic SEO
export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(`
    *[_type == "storeSettings"][0]{
      storeName,
      siteUrl,
      siteDescription,
      "ogImage": ogImage.asset->url
    }
  `)

  const title = settings?.storeName || "Luxury Store"
  const description =
    settings?.siteDescription ||
    "Welcome to our online store — premium products, smooth checkout."

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: settings?.ogImage || `${settings?.siteUrl || ""}/default-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${title} OpenGraph image`,
        },
      ],
      url: settings?.siteUrl,
      siteName: title,
    },
    metadataBase: new URL(settings?.siteUrl || "https://example.com"),
  }
}

// ✅ Self-hosted fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const isStudio = process.env.NEXT_PUBLIC_SANITY_STUDIO === "true"

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-white text-gray-900`}>
        {/* ✅ Wrap body with client layout (Navbar/Footer logic here) */}
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>

{isEnabled && isStudio && (
  <>
    <DisableDraftMode />
    <VisualEditing />
  </>
)}

<SanityLive />
      </body>
    </html>
  )
}
