import { defineType, defineField } from "sanity"

export default defineType({
  name: "navbar",
  title: "Navbar",
  type: "document",
  fields: [
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
      name: "highlightColor",
      title: "Highlight Color",
      type: "color",
    }),
    defineField({
      name: "highlightHover",
      title: "Highlight Hover",
      type: "color",
    }),
    defineField({
      name: "logo",
      title: "Logo Text",
      type: "object",
      fields: [
        { name: "highlight", type: "string", title: "Highlight Part" },
        { name: "rest", type: "string", title: "Rest of Logo" },
      ],
    }),
    defineField({
      name: "links",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "string", title: "Link" },
          ],
        },
      ],
    }),


    defineField({
  name: "logoImage",
  title: "Logo Image",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Alt Text",
    }),
  ],
}),



    defineField({
      name: "cta",
      title: "CTA Buttons",
      type: "object",
      fields: [
        {
          name: "cart",
          title: "Cart Button",
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "string", title: "Href" },
          ],
        },
        {
          name: "signup",
          title: "Signup Button",
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "string", title: "Href" },
          ],
        },
      ],
    }),
  ],
})
