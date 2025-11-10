"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/Home/Navbar"
import Footer from "@/Home/Footer"

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudioRoute = pathname.startsWith("/studio")

  return (
    <>
      {/* ✅ Hide Navbar/Footer when inside Sanity Studio */}
      {!isStudioRoute && <Navbar />}
      <main>{children}</main>
      {!isStudioRoute && <Footer />}
    </>
  )
}
