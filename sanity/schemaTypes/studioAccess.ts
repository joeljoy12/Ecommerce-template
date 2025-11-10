import { defineType, defineField } from "sanity"

export default defineType({
  name: "studioAccess",
  title: "Studio Access Settings",
  type: "document",
  fields: [
    defineField({
      name: "adminPassword",
      title: "Admin Password",
      type: "string",
      description: "Full access to Sanity Studio",
    }),
    defineField({
      name: "editorPassword",
      title: "Editor Password",
      type: "string",
      description: "Can edit content but not settings",
    }),
    defineField({
      name: "viewerPassword",
      title: "Viewer Password",
      type: "string",
      description: "Read-only access",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Studio Access Passwords 🔒" }
    },
  },
})
