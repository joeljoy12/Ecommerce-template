export default {
  name: "benefit",
  title: "Benefits Section",
  type: "document",
  fields: [
    { name: "title", title: "Section Title", type: "string" },
    {
      name: "items",
      title: "Benefit Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icon", type: "string" },
            { name: "heading", title: "Heading", type: "string" },
            { name: "text", title: "Text", type: "text" },
          ],
        },
      ],
    },
  ],
}
