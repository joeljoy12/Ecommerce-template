import { createClient } from "next-sanity"

export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN, // ✅ write-enabled API token
  useCdn: false, // must be false for mutations
  apiVersion: "2025-08-27",
})
