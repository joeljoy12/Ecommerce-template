import { Rule, defineType, defineField } from "sanity"

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",

  fields: [
    // 🎨 Colors
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "color",
      description: "Controls the background color of the footer section.",
    }),
    defineField({
      name: "textColor",
      title: "Text Color",
      type: "color",
      description: "Color used for footer text.",
    }),
    defineField({
      name: "borderColor",
      title: "Border Color",
      type: "color",
      description: "Color for the top border of the footer.",
    }),

    // 🏷️ Brand Information
    defineField({
      name: "brand",
      title: "Brand Info",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Brand Name",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          description: "A short tagline or sentence about your brand.",
        }),
      ],
    }),

    // 🔗 Quick Links
    defineField({
      name: "links",
      title: "Quick Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Href (URL or Anchor)", type: "string" },
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),

    // 📨 Newsletter Section
    defineField({
      name: "newsletter",
      title: "Newsletter",
      type: "object",
      fields: [
        { name: "placeholder", title: "Placeholder", type: "string" },
        { name: "buttonLabel", title: "Button Label", type: "string" },
        { name: "buttonBg", title: "Button Background", type: "color" },
        { name: "buttonHover", title: "Button Hover", type: "color" },
      ],
    }),

    // 🌐 Social Links
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: ["facebook", "instagram", "twitter"],
                layout: "radio",
              },
            },
            { name: "href", title: "Link", type: "url" },
          ],
          preview: { select: { title: "icon", subtitle: "href" } },
        },
      ],
    }),

    // ⚖️ Copyright
    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "string",
    }),
  ],

  // 🧭 Preview
  preview: {
    select: { title: "brand.name", subtitle: "copyright" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || "Footer Section",
        subtitle: subtitle || "No copyright text set",
      }
    },
  },
})
