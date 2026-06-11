import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "seo",     title: "SEO" },
    { name: "hero",    title: "Hero" },
    { name: "content", title: "Content" },
  ],
  fields: [
    // ── SEO ────────────────────────────────────────────────
    defineField({
      name: "metaTitle",
      title: "Page Title (SEO)",
      type: "string",
      group: "seo",
      description: "Shown in browser tab and Google results. ~60 chars ideal.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description (SEO)",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Shown under the page title in Google results. ~155 chars ideal.",
    }),

    // ── Hero ───────────────────────────────────────────────
    defineField({
      name: "announcementText",
      title: "Announcement Bar",
      type: "string",
      group: "hero",
      description: "The green bar above the nav. e.g. 'Fully bulk billed · New patients welcome'",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
      group: "hero",
      description: "Main H1. e.g. 'Family medicine, made personal.'",
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "text",
      rows: 3,
      group: "hero",
      description: "Paragraph below the H1.",
    }),

    // ── Content ────────────────────────────────────────────
    defineField({
      name: "whyUsHeading",
      title: "\"Why Annadale\" Section Heading",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "whyUsPoints",
      title: "Why Us — Key Points",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "body",    title: "Body",    type: "text", rows: 2 }),
          ],
          preview: { select: { title: "heading", subtitle: "body" } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
