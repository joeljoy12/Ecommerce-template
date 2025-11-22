"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";
import { useRouter, usePathname } from "next/navigation";

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

   const pathname = usePathname()
   
   if (!pathname.startsWith("/studio")) {
    return null
  }


  return (
   <a
  href="/api/draft-mode/disable"
  className="fixed bottom-4 right-4 bg-[#D4AF37] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#b8952e] transition-colors duration-300"
>
  Disable Draft Mode
</a>

  );
}