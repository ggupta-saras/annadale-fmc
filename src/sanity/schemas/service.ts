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
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Everyday", value: "Everyday" },
          { title: "Long-term", value: "Long-term" },
          { title: "Prevention", value: "Prevention" },
          { title: "Family", value: "Family" },
          { title: "Women's", value: "Women's" },
          { title: "Men's", value: "Men's" },
          { title: "Wellbeing", value: "Wellbeing" },
          { title: "Anywhere", value: "Anywhere" },
        ],
      },
    }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  preview: {
    select: { title: "title" },
  },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
