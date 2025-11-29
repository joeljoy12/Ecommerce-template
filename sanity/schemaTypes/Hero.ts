import { defineType, defineField } from "sanity"

export default defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),

    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
    }),

    defineField({
      name: "cta",
      title: "Primary Button",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "href", title: "Link", type: "url" },
        { name: "bgColor", title: "Background Color", type: "color" },
        { name: "textColor", title: "Text Color", type: "string" },
      ],
    }),

    defineField({
      name: "cta2",
      title: "Secondary Button",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },

        {
          name: "href",
          title: "Internal Link",
          type: "string",
          description: "Only internal routes like /shop, /contact, /products/1",
          validation: (rule) =>
            rule
              .regex(/^\/(?!\/)/, {
                name: "internalLink",
                invert: false,
              })
              .error("Must start with a single slash (/). Example: /shop")
        },

        { name: "bgColor", title: "Background Color", type: "color" },
        { name: "textColor", title: "Text Color", type: "string" },
      ],
    }),

    defineField({
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "color",
    }),
  ],

  preview: {
    select: {
      title: "heading",
      subtitle: "subheading",
      media: "image",
    },
  },
})
