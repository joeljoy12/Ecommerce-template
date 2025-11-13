"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();

  // ✅ Show only when inside Sanity Studio's Presentation Tool (iframe)
  if (String(environment) !== "presentation") {
    return null;
  }

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 bg-[#D4AF37] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#b8952e] transition-colors duration-300 z-50"
    >
      Disable Draft Mode
    </a>
  );
}
