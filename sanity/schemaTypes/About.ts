export default {
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [{ type: "text" }],
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    { name: "ctaText", title: "CTA Text", type: "string" },
    { name: "ctaLink", title: "CTA Link", type: "url" },
  ],
}
