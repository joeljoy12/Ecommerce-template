import { client } from "@/sanity/lib/sanity.client"
import ProductClient from "./ProductClient"

async function getProduct(slug: string) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      price,
      description,
      "imageGallery": coalesce(imageGallery[].asset->url, [image.asset->url])
    }`,
    { slug }
  )
}


// ✅ FIXED: match Next.js 15.5 App Router typing
export default async function ProductPage({
  params,
}: {
  params: Promise<Record<string, string | string[] | undefined>>
}) {
  // ✅ Await the params Promise (same issue as before)
  const resolvedParams = await params
  const slug = resolvedParams?.slug as string

  const product = await getProduct(slug)

  if (!product) {
    return <p className="text-center mt-20">Product not found</p>
  }

  return <ProductClient product={product} quantity={1} />
}
