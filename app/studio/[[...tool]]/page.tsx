// app/studio/[[...tool]]/page.tsx
import { NextStudio } from "next-sanity/studio"
import config from "../../../sanity.config"

export const dynamic = "force-dynamic"

// ✅ Filter out the invalid prop before passing
const SafeNextStudio = (props: any) => {
  const { disabletransition, ...rest } = props || {}
  return <NextStudio {...rest} />
}

export default function StudioPage() {
  return <SafeNextStudio config={config} />
}
