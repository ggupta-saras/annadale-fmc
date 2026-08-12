import { defineField, defineType } from "sanity";

export const alliedHealthPage = defineType({
  name: "alliedHealthPage",
  title: "Allied Health Page",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Header Photo",
      type: "image",
      options: { hotspot: true },
      description:
        "Large photo shown beside the heading at the top of the Allied Health page. Landscape works best. Until one is uploaded, the \"How to book\" details are shown in that space instead.",
    }),
  ],
  preview: {
    select: { media: "heroImage" },
    prepare: ({ media }) => ({ title: "Allied Health Page", subtitle: media ? "Header photo set" : "No header photo yet", media }),
  },
});
