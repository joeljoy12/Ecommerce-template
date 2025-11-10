import { defineType, defineField } from "sanity"

export default defineType({
  name: "studioPassword",
  title: "Studio Password",
  type: "document",
  fields: [
    defineField({
      name: "password",
      title: "Password",
      type: "string",
      description: "Set the password required to open your Sanity Studio.",
    }),
  ],
  preview: {
    select: { title: "password" },
    prepare({ title }) {
      return {
        title: "Studio Password",
        subtitle: title ? "✅ Password Set" : "❌ No Password Set",
      }
    },
  },
})
