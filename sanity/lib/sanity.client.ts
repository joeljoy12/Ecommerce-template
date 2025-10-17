import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"


export const client = createClient({
  projectId: "su0ct7ds",   // 👈 get this from sanity.config.ts
  dataset: "production",
  apiVersion: "2023-01-01",       // use today’s date or a recent stable one
  useCdn: true
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}