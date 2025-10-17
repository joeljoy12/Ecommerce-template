import { defineField, defineType } from "sanity";

export default defineType({
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    defineField({
      name: "stripeSessionId",
      title: "Stripe Session ID",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
    }),

    // 🆕 Shipping Address section
    defineField({
      name: "shippingAddress",
      title: "Shipping Address",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Full Name", type: "string" }),
        defineField({ name: "line1", title: "Address Line 1", type: "string" }),
        defineField({ name: "line2", title: "Address Line 2", type: "string" }),
        defineField({ name: "city", title: "City", type: "string" }),
        defineField({ name: "state", title: "State / Province", type: "string" }),
        defineField({ name: "postalCode", title: "Postal Code", type: "string" }),
        defineField({ name: "country", title: "Country", type: "string" }),
      ],
      description: "Customer shipping details collected from Stripe Checkout",
    }),

    defineField({
      name: "total",
      title: "Total Amount",
      type: "number",
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
      },
      initialValue: "processing",
    }),
    defineField({
      name: "estimatedDelivery",
      title: "Estimated Delivery",
      type: "datetime",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Product Name", type: "string" },
            { name: "quantity", title: "Quantity", type: "number" },
            { name: "price", title: "Price", type: "number" },
            { name: "imageUrl", title: "Image URL", type: "url" },
          ],
        },
      ],
    }),
  ],
});
