import { draftMode } from "next/headers"
import { NextResponse } from "next/server"

export  function GET(request: Request) {
  draftMode().disable() // or .enable()
  return NextResponse.redirect(new URL("/", request.url))
}
