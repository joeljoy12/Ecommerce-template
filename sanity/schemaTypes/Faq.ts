import { defineType, defineField, defineArrayMember } from "sanity"

export default defineType({
  name: "faq",
  title: "FAQ Section",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
    }),

    // 🎨 Color controls
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "color",
      description: "Background color for the FAQ section",
    }),
    defineField({
      name: "textColor",
      title: "Question Text Color",
      type: "color",
      description: "Color for FAQ question text",
    }),
    defineField({
      name: "cardBackground",
      title: "Card Background Color",
      type: "color",
      description: "Background color for each FAQ card",
    }),
    defineField({
      name: "answerColor",
      title: "Answer Text Color",
      type: "color",
      description: "Color for FAQ answers",
    }),

    // 📚 FAQ items
    defineField({
      name: "faqs",
      title: "FAQ Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          title: "FAQ Item",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
            }),
          ],
          preview: {
            select: { title: "question" },
          },
        }),
      ],
    }),
  ],

  // 🧭 Preview in Studio
  preview: {
    select: { title: "title", faqs: "faqs" },
    prepare({ title, faqs }) {
      const count = faqs?.length || 0
      return {
        title: title || "FAQ Section",
        subtitle: `${count} question${count === 1 ? "" : "s"}`,
      }
    },
  },
})
