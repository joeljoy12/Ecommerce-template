export default {
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    { name: "backgroundColor", title: "Background Color", type: "string" },
    { name: "textColor", title: "Text Color", type: "string" },
    { name: "borderColor", title: "Border Color", type: "string" },

    {
      name: "brand",
      title: "Brand Info",
      type: "object",
      fields: [
        { name: "name", title: "Brand Name", type: "string" },
        { name: "description", title: "Description", type: "text" },
      ],
    },

    {
      name: "links",
      title: "Quick Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Href", type: "string" },
          ],
        },
      ],
    },

    {
      name: "newsletter",
      title: "Newsletter",
      type: "object",
      fields: [
        { name: "placeholder", title: "Placeholder", type: "string" },
        { name: "buttonLabel", title: "Button Label", type: "string" },
        { name: "buttonBg", title: "Button Background", type: "string" },
        { name: "buttonHover", title: "Button Hover", type: "string" },
      ],
    },

    {
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
              },
            },
            { name: "href", title: "Link", type: "url" },
          ],
        },
      ],
    },

    { name: "copyright", title: "Copyright Text", type: "string" },
  ],
}
