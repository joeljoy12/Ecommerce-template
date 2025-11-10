import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

export async function GET() {
  draftMode().enable()
  redirect("/") // change "/" to your home page or preview route if needed
}
