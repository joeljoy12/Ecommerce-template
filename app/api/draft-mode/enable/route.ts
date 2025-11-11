import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

export async function GET() {
  const dm = await draftMode()   // ✅ must await
  dm.enable()                    // ✅ enable after awaiting
  redirect("/")                  // redirect to homepage or preview page
}
