import { sanityFetch } from "@/sanity/lib/live"
import ProductClient from "./ProductClient"

const query = `
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    price,
    description,
    "imageGallery": coalesce(imageGallery[].asset->url, [image.asset->url])
  }
`

export default async function ProductPage({
  params,
}: {
  params: Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedParams = await params
  const slug = resolvedParams?.slug as string

  // 🧠 Fetch product from Sanity Live Content API
  const { data: product } = await sanityFetch({ query, params: { slug } })

  // ⚙️ Fallback UI
  if (!product) {
    return <p className="text-center mt-20 text-gray-600">Product not found</p>
  }

  // ✅ Pass live data to client component
  return <ProductClient product={product} quantity={1} />
}
