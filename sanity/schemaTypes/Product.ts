import { Rule } from "sanity"

export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Product Name",
      type: "string",
     
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
     
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      
    },
    {
      name: "imageGallery",
      title: "Image Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Accessible alt text for SEO",
            },
          ],
        },
      ],
      
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "link",
      title: "Product Link",
      type: "url",
    },
    {
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      description: "Show this product in Featured section",
    },
  ],
}
