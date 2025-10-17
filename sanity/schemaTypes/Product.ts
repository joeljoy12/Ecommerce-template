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
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule: Rule) => Rule.min(0),
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
      validation: (Rule: Rule) => Rule.min(1).error("At least one image is required"),
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
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      media: "imageGallery.0", // ✅ first image as preview
    },
  },
}
