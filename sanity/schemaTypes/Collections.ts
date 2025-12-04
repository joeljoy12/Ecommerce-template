import { Rule } from "sanity"

export default {
   name: "collectionProduct", // 👈 unique name
  title: "Collection Products",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
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
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      description: "Mark this to show in the Featured Products section",
    },
  ],
 
}
