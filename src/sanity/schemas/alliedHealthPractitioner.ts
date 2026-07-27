import { defineField, defineType } from "sanity";

export const alliedHealthPractitioner = defineType({
  name: "alliedHealthPractitioner",
  title: "Allied Health Practitioner",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string" }),
    defineField({
      name: "roleOrService",
      title: "Role / Service",
      type: "string",
      description: "e.g. \"Physiotherapist\" or \"Acupuncturist\" — shown under their name.",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Short Bio",
      type: "text",
      rows: 3,
      description: "1-2 sentences max — shown on the Allied Health page.",
      validation: (Rule) =>
        Rule.custom((text: string | undefined) => {
          if (!text) return true;
          const count = text.trim().split(/\s+/).filter(Boolean).length;
          return count <= 50 || `${count} words — please trim to 50 or fewer.`;
        }),
    }),
    defineField({
      name: "bookingUrl",
      title: "Booking Link (optional)",
      type: "url",
      description: "Leave blank to show \"Book through reception\" linking to the practice phone number instead.",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  preview: {
    select: { title: "name", subtitle: "roleOrService", media: "photo" },
  },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
