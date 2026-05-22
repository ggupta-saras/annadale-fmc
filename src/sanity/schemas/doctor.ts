import { defineField, defineType } from "sanity";

export const doctor = defineType({
  name: "doctor",
  title: "Doctor",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string" }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "qualifications", title: "Qualifications (e.g. MBBS, FRACGP)", type: "string" }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "specialInterests",
      title: "Special Interests",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "languages",
      title: "Languages Spoken",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "acceptingNewPatients",
      title: "Accepting New Patients",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: "name", media: "photo", subtitle: "qualifications" },
  },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
