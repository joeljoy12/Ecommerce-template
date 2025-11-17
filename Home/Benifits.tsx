"use client";

import { useEffect, useState } from "react";
import * as lucideIcons from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { sanityFetch } from "@/sanity/lib/live";


const query = `
  *[_type == "benefit"][0]{
    title,
    backgroundColor,
    items[] { icon, heading, text }
  }
`;

// ✅ Fallback icon generator
function getFallbackIcon(name: string) {
  const fallback = "Star";

  const formatted =
    name
      ?.split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("") || fallback;

  return lucideIcons[formatted] || lucideIcons[fallback];
}

export default function Benefits() {
  const [benefits, setBenefits] = useState<any>(null);

  useEffect(() => {
    sanityFetch({ query })
      .then((res) => {
        setBenefits(
          res?.data || {
            // ✅ Fallback data if Sanity returns null
            title: "Why Choose Us",
            backgroundColor: { hex: "#ffffff" },
            items: [
              {
                icon: "star",
                heading: "Premium Quality",
                text: "Only the best curated products.",
              },
              {
                icon: "shield-check",
                heading: "Secure Checkout",
                text: "Your payments are safe and encrypted.",
              },
              {
                icon: "truck",
                heading: "Fast Delivery",
                text: "Quick and reliable shipping.",
              },
            ],
          }
        );
      })
      .catch(() => {
        // ❌ When Sanity fetch fails entirely
        setBenefits({
          title: "Why Choose Us",
          backgroundColor: { hex: "#ffffff" },
          items: [
            {
              icon: "star",
              heading: "Premium Quality",
              text: "Only the best curated products.",
            },
            {
              icon: "shield-check",
              heading: "Secure Checkout",
              text: "Your payments are safe and encrypted.",
            },
            {
              icon: "truck",
              heading: "Fast Delivery",
              text: "Quick and reliable shipping.",
            },
          ],
        });
      });
  }, []);

  if (!benefits)
    return <p className="text-center py-20">Loading benefits…</p>;

  return (
    <section
      className="py-16"
      style={{
        backgroundColor: benefits.backgroundColor?.hex || "#ffffff",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 heading">
          {benefits.title || "Our Benefits"}
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {benefits.items?.map((item: any, index: number) => {
            const FallbackIcon = getFallbackIcon(item.icon);

            return (
              <div key={index} className="p-4">
                <div className="flex justify-center mb-4 text-[#D4AF37]">
                  {/* Preferred: dynamic lucide import */}
                  <DynamicIcon
                    name={item.icon || "star"}
                    size={40}
                    color="#D4AF37"
                  />

                  {/* Static fallback (if dynamic icon fails) */}
                  {/* <FallbackIcon size={40} color="#D4AF37" /> */}
                </div>

                <h3 className="font-semibold text-xl heading text-[#111111]">
                  {item.heading || "Benefit Title"}
                </h3>

                <p className="text-[#6B7280] mt-2">
                  {item.text || "Description goes here."}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
