"use client"
import { useState, useEffect } from "react"
import { client } from "../sanity/lib/sanity.client"

async function getFAQ() {
  return client.fetch(`*[_type == "faq"][0]{
    title,
    backgroundColor,
    textColor,
    cardBackground,
    answerColor,
    faqs
  }`)
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [faq, setFaq] = useState<any>(null)

  // ✅ Demo fallback if Sanity has no FAQ
  const demo = {
    title: "Frequently Asked Questions",
    backgroundColor: "#ffffff",
    textColor: "#111111",
    cardBackground: "#F9FAFB",
    answerColor: "#6B7280",
    faqs: [
      {
        question: "Do you offer free shipping?",
        answer: "Yes! We provide free worldwide shipping on all orders."
      },
      {
        question: "Are your products cruelty-free?",
        answer: "Absolutely. All LuxSkin products are 100% cruelty-free and eco-friendly."
      },
      {
        question: "How long will my order take to arrive?",
        answer: "Orders typically arrive within 5–7 business days depending on your location."
      }
    ]
  }

  useEffect(() => {
    getFAQ().then((data) => {
      setFaq(data || demo) // 👈 fallback if no data
    })
  }, [])

  if (!faq) return <p className="text-center py-20">Loading FAQs...</p>

  return (
    <section style={{ backgroundColor: faq.backgroundColor }} className="py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h2
          className="text-3xl font-bold text-center mb-12"
          style={{ color: faq.textColor }}
        >
          {faq.title}
        </h2>

        <div className="space-y-6">
          {faq.faqs?.map((item: any, i: number) => (
            <div
              key={i}
              className="rounded-lg shadow-md p-6 cursor-pointer"
              style={{ backgroundColor: faq.cardBackground }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <h3
                className="font-semibold text-lg flex justify-between items-center"
                style={{ color: faq.textColor }}
              >
                {item.question}
                <span className="text-[#6B7280]">
                  {openIndex === i ? "-" : "+"}
                </span>
              </h3>

              {openIndex === i && (
                <p className="mt-3" style={{ color: faq.answerColor }}>
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
