import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/Home/Navbar"
import Footer from "@/Home/Footer"
import { Inter, Playfair_Display } from "next/font/google"
import { client } from "@/sanity/lib/sanity.client"

// ✅ Fetch dynamic SEO data from Sanity
export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(
    `*[_type == "storeSettings"][0]{
      storeName,
      siteUrl,
      siteDescription,
      "ogImage": ogImage.asset->url
    }`
  )

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

// ✅ Self-hosted + non-blocking fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // <-- crucial: prevents render blocking
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap", // <-- crucial: prevents render blocking
})

// ✅ Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload fonts early to boost LCP */}
        <link
          rel="preload"
          href="/_next/static/media/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/playfair-display-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-white text-gray-900`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
