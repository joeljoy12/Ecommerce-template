export default {
  name: "faq",
  title: "FAQ Section",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "backgroundColor", title: "Background Color", type: "string" },
    { name: "textColor", title: "Text Color", type: "string" },
    { name: "cardBackground", title: "Card Background Color", type: "string" },
    { name: "answerColor", title: "Answer Text Color", type: "string" },
    {
      name: "faqs",
      title: "FAQ Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "string" },
            { name: "answer", title: "Answer", type: "text" },
          ],
        },
      ],
    },
  ],
}
