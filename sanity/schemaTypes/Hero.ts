import { defineType, defineField } from "sanity"
import { colorInput } from "@sanity/color-input"

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
      title: "Call To Action",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "href", title: "Link", type: "url" },
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
    name: "cta2",
    title: "Secondary Button",
    type: "object",
    fields: [
      { name: "label", title: "Label", type: "string" },
      { name: "href", title: "Link", type: "url" },
      { name: "bgColor", title: "Background Color", type: "color" },
      { name: "textColor", title: "Text Color", type: "string" },
    ],
  }),

      // ⭐ NEW SECOND BUTTON
  
    // ✅ Color picker field
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "color", // <--- changed from string
    }),
  ],

    // ⭐ NEW SECOND BUTTON


  preview: {
    select: {
      title: "heading",
      subtitle: "subheading",
      media: "image",
    },
  },
})
