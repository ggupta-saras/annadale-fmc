import { defineField, defineType } from "sanity";

export const announcement = defineType({
  name: "announcement",
  title: "Announcement",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({ name: "active", title: "Show on Website", type: "boolean", initialValue: true }),
    defineField({ name: "startDate", title: "Start Date", type: "date" }),
    defineField({ name: "endDate", title: "End Date (optional)", type: "date" }),
  ],
  preview: {
    select: { title: "title", subtitle: "active" },
  },
});
