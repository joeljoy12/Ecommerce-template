import { defineType, defineField } from "sanity"
import CountrySelectorInput from "../components/CountrySelectorInput"

export default defineType({
  name: "storeSettings",
  title: "Store Settings",
  type: "document",

  fields: [
    defineField({
      name: "storeName",
      title: "Store Name",
      type: "string",
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "siteUrl",
      title: "Website URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "ogImage",
      title: "OG Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "stripeSection",
      title: "Stripe Configuration",
      type: "object",
      fields: [
        { name: "publishableKey", type: "string", title: "Publishable Key" },
        { name: "secretKey", type: "string", title: "Secret Key" },
        { name: "webhookSecret", type: "string", title: "Webhook Secret" },
      ],
    }),

    defineField({
      name: "allowedCountries",
      title: "Allowed Countries",
      type: "array",
      of: [{ type: "string" }],
      components: { input: CountrySelectorInput },
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
