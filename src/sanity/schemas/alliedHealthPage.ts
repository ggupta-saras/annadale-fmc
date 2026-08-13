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
        "Large photo shown beside the heading at the top of the Allied Health page. Landscape works best. Leave blank and the page uses the clinic signage photo as a default.",
    }),
  ],
  preview: {
    select: { media: "heroImage" },
    prepare: ({ media }) => ({ title: "Allied Health Page", subtitle: media ? "Header photo set" : "No header photo yet", media }),
  },
});
