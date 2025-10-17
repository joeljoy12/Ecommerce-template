export default {
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    { name: "heading", title: "Heading", type: "string" },
    { name: "subheading", title: "Subheading", type: "text" },
    {
      name: "cta",
      title: "Call To Action",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "href", title: "Link", type: "url" },
        { name: "bgColor", title: "Background Color", type: "string" },
        { name: "textColor", title: "Text Color", type: "string" }
      ]
    },
    {
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true }
    },
    { name: "backgroundColor", title: "Background Color", type: "string" }
  ]
}
