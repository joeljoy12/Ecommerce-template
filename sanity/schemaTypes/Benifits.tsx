import { defineType, defineField, defineArrayMember } from "sanity"
import IconSelector from "../components/IconPicker"// ✅ custom component

export default defineType({
  name: "benefit",
  title: "Benefits Section",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
    }),

    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "color",
      description: "Pick a background color for this section",
    }),

    defineField({
      name: "items",
      title: "Benefit Items",
      type: "array",
      of: [
        defineArrayMember({
          name: "benefitItem",
          title: "Benefit Item",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Choose an icon from Lucide React",
              components: { input: IconSelector as any }, // cast to any to satisfy Sanity's StringInputProps typing
            }),
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
            }),
          ],

          // ✅ Optional: add item-level preview
          preview: {
            select: { title: "heading", icon: "icon" },
            prepare({ title, icon }) {
              return {
                title: title || "Untitled Benefit",
                subtitle: icon ? `Icon: ${icon}` : "No icon selected",
              }
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare({ title, items }) {
      const count = items?.length || 0
      return {
        title: title || "Benefits Section",
        subtitle: `${count} benefit${count === 1 ? "" : "s"}`,
      }
    },
  },
})
