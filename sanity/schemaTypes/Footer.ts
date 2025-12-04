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
    }),
    defineField({
      name: "textColor",
      title: "Text Color",
      type: "color",
    }),
    defineField({
      name: "borderColor",
      title: "Border Color",
      type: "color",
    }),

    // ⭐ NEW — Footer Logo Upload Field
    defineField({
      name: "footerLogo",
      title: "Footer Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),

    // 🏷️ Brand Info
    defineField({
      name: "brand",
      title: "Brand Info",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Brand Name",
          type: "string",
          
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
        }),
      ],
    }),

    // 🔗 Quick Links
    defineField({
      name: "links",
      title: "Quick Links",
      type: "array",
      of: [
        defineField({
          name: "linkItem",
          title: "Link Item",
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Href", type: "string" },
          ],
        }),
      ],
    }),

    // 📨 Newsletter
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

    // 🌐 Social Media
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        defineField({
          name: "socialItem",
          title: "Social Link",
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
        }),
      ],
    }),

    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "string",
    }),
  ],

  preview: {
    select: {
      title: "brand.name",
      subtitle: "copyright",
    },
  },
})
