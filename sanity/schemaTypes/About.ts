import { defineType, defineField } from "sanity"

export default defineType({
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [{ type: "text" }],
      description: "Add one or more paragraphs for the About section",
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "ctaText",
      title: "CTA Text",
      type: "string",
      description: "The text for the call-to-action button",
    }),

    defineField({
      name: "ctaLink",
      title: "CTA Link",
      type: "url",
      description: "The URL the call-to-action button will link to",
    }),

    // 🎨 New: Background color picker
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "color",
      description: "Choose a background color for the About section",
    }),
  ],

  preview: {
    select: {
      title: "title",
      image: "image",
      bg: "backgroundColor",
    },
    prepare({ title, image, bg }) {
      return {
        title: title || "Untitled About Section",
        subtitle: bg ? `Background: ${bg.hex}` : "No background color set",
        media: image,
      }
    },
  },
})
