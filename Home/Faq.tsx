

import { sanityFetch } from "@/sanity/lib/live"

// ✅ Define TypeScript interfaces for strong typing
interface FAQItem {
  question: string
  answer: string
}

interface FAQColor {
  hex?: string
}

interface FAQData {
  title: string
  backgroundColor?: FAQColor | string
  textColor?: FAQColor | string
  cardBackground?: FAQColor | string
  answerColor?: FAQColor | string
  faqs: FAQItem[]
}

// ✅ Sanity Query
const query = `
  *[_type == "faq"][0]{
    title,
    backgroundColor,
    textColor,
    cardBackground,
    answerColor,
    faqs[] {
      question,
      answer
    }
  }
`

export default async function FAQ() {
  // 🧠 Fetch from Sanity
  const result = await sanityFetch({ query })
  const faq = result?.data as FAQData | null

  // ✅ Fallback if Sanity data is empty
  const fallback: FAQData = {
    title: "Frequently Asked Questions",
    backgroundColor: "#ffffff",
    textColor: "#111111",
    cardBackground: "#F9FAFB",
    answerColor: "#6B7280",
    faqs: [
      {
        question: "Do you offer free shipping?",
        answer: "Yes! We provide free worldwide shipping on all orders.",
      },
      {
        question: "Are your products cruelty-free?",
        answer:
          "Absolutely. All LuxSkin products are 100% cruelty-free and eco-friendly.",
      },
      {
        question: "How long will my order take to arrive?",
        answer:
          "Orders typically arrive within 5–7 business days depending on your location.",
      },
    ],
  }

  const data = faq && faq.faqs?.length > 0 ? faq : fallback

  // ✅ Utility: safely extract hex or string color
  const getColor = (color: FAQColor | string | undefined, fallback: string) =>
    typeof color === "string" ? color : color?.hex || fallback

  return (
    <section
      className="py-20 transition-colors duration-300"
      style={{
        backgroundColor: getColor(data.backgroundColor, "#ffffff"),
        color: getColor(data.textColor, "#111111"),
      }}
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* Section Title */}
        <h2
          className="text-3xl font-bold text-center mb-12"
          style={{ color: getColor(data.textColor, "#111111") }}
        >
          {data.title}
        </h2>

        {/* FAQ Items */}
        <div className="space-y-6">
          {data.faqs.map((item, i) => (
            <details
              key={i}
              className="group rounded-lg shadow-md overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: getColor(data.cardBackground, "#F9FAFB"),
              }}
            >
              <summary
                className="cursor-pointer select-none font-semibold text-lg flex justify-between items-center p-6"
                style={{ color: getColor(data.textColor, "#111111") }}
              >
                {item.question}
                <span className="ml-2 text-[#6B7280] group-open:rotate-180 transition-transform duration-300">
                  ▼
                </span>
              </summary>

              <p
                className="px-6 pb-6 text-base leading-relaxed"
                style={{ color: getColor(data.answerColor, "#6B7280") }}
              >
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
