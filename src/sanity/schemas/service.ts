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
      name: "image",
      title: "Square Logo / Photo",
      type: "image",
      options: { hotspot: true },
      description: "Small square logo or photo shown on the card. Falls back to the icon above when left blank.",
    }),
    defineField({
      name: "externalBookingUrl",
      title: "External Booking URL",
      type: "url",
      description: "Only for partner-run services with their own booking system (e.g. Infusion Avenue, Kosmetika). Leave blank to show \"Book through reception\" linking to the practice phone number instead.",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
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
          { title: "Allied Health", value: "Allied Health" },
        ],
      },
    }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
