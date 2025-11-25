import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // ❗ Allow preview ONLY inside /studio
  if (!path.startsWith("/studio")) {
    // Clear preview cookies
    const res = NextResponse.next()
    res.cookies.set("__prerender_bypass", "", { maxAge: 0, path: "/" })
    res.cookies.set("__next_preview_data", "", { maxAge: 0, path: "/" })
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - /_next
     * - static files
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
