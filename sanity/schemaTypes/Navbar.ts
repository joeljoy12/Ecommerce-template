export default {
  name: "navbar",
  title: "Navbar",
  type: "document",
  fields: [
    { name: "backgroundColor", title: "Background Color", type: "string" },
    { name: "textColor", title: "Text Color", type: "string" },
    { name: "highlightColor", title: "Highlight Color", type: "string" },
    { name: "highlightHover", title: "Highlight Hover Color", type: "string" },
    {
      name: "logo",
      title: "Logo",
      type: "object",
      fields: [
        { name: "highlight", title: "Highlight Part", type: "string" },
        { name: "rest", title: "Rest of Logo", type: "string" },
      ],
    },
    {
      name: "links",
      title: "Links",
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
      name: "cta",
      title: "Call To Action",
      type: "object",
      fields: [
        {
          name: "cart",
          title: "Cart Button",
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Href", type: "string" },
          ],
        },
        {
          name: "signup",
          title: "Signup Button",
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Href", type: "string" },
          ],
        },
      ],
    },
  ],
}

