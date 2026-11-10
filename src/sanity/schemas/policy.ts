import { defineArrayMember, defineField, defineType } from "sanity";

// One document per practice policy (Privacy, Social Media, and the others the
// clinic adds for accreditation). Each becomes a page at /policies/<slug>.
// The body is the policy text itself, pasted from the clinic's document; leave
// the internal document-control table at the top of the PDF out.
export const policy = defineType({
  name: "policy",
  title: "Policy",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Shown as the page heading, for example 'Privacy and Confidentiality Policy'.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      description:
        "The end of the page address: annadalefmc.com.au/policies/<this>. Click Generate to make it from the title. Changing it breaks any existing links to the page, including the footer.",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Policy text",
      type: "array",
      description: "Use 'Heading' for each numbered section title and the bullet list button for bullet points.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [defineField({ name: "href", type: "url", title: "URL", validation: (rule) => rule.uri({ scheme: ["http", "https", "mailto", "tel"] }) })],
              },
            ],
          },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});
