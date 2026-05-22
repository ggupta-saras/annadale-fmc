import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Service Title", type: "string" }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: "icon", title: "Icon Name (lucide-react)", type: "string" }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  preview: {
    select: { title: "title" },
  },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
