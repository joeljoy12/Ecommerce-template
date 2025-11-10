
"use client"
import { useState } from "react"

export default function FAQClient({ faq }: { faq: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
              className="rounded-lg shadow-md p-6 cursor-pointer transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: faq.cardBackground }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <h3
                className="font-semibold text-lg flex justify-between items-center"
                style={{ color: faq.textColor }}
              >
                {item.question}
                <span className="text-[#6B7280] text-2xl leading-none">
                  {openIndex === i ? "−" : "+"}
                </span>
              </h3>

              {openIndex === i && (
                <p
                  className="mt-3 text-base transition-all duration-300"
                  style={{ color: faq.answerColor }}
                >
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
