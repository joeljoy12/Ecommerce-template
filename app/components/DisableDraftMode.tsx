"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { disableDraftMode } from "@/app/actions";
import {useDraftModeEnvironment} from "next-sanity/hooks";

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const environment = useDraftModeEnvironment();
  
// Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <div>
      {pending ? (
        "Disabling draft mode..."
      ) : (
       <button
  type="button"
  onClick={disable}
  className="px-4 py-2 rounded-lg bg-[#D4AF37] text-white border border-[#B8860B] hover:bg-[#B8860B] transition"
>
  Disable Draft Mode
</button>

      )}
    </div>
  );
}