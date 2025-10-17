export default {
  name: "testimonial",
  title: "Testimonials Section",
  type: "document",
  fields: [
    { name: "title", title: "Section Title", type: "string" },
    { name: "backgroundColor", title: "Background Color", type: "string" },
    { name: "cardBackground", title: "Card Background", type: "string" },
    { name: "starColor", title: "Star Color", type: "string" },
    {
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Reviewer Name", type: "string" },
            { name: "text", title: "Review Text", type: "text" },
            {
              name: "rating",
              title: "Rating (1–5)",
              type: "number",
              validation: (Rule: any) => Rule.min(1).max(5),
            },
          ],
        },
      ],
    },
  ],
}
