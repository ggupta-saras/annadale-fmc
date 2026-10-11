import { defineField, defineType } from "sanity";

// Every field is optional. Anything left blank falls back to the wording that
// was on the page before it became editable, so publishing an empty document
// changes nothing and the clinic can edit one thing at a time.
export const beveridgePage = defineType({
  name: "beveridgePage",
  title: "Beveridge Clinic Page",
  type: "document",
  fields: [
    defineField({
      name: "intro",
      title: "Intro paragraph",
      type: "text",
      rows: 4,
      description: "The paragraph under the page heading. Leave blank to keep the current wording.",
    }),
    defineField({
      name: "sessions",
      title: "Session times",
      type: "array",
      description:
        "Shown in the 'Beveridge sessions' box next to the heading. Add one row per session, for example Saturday — 11:00am – 5:00pm. Leave empty to keep the current 'call to confirm' wording.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "day", title: "Day", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "time", title: "Time", type: "string", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "day", subtitle: "time" } },
        },
      ],
    }),
    defineField({
      name: "sessionsNote",
      title: "Note under the session times",
      type: "text",
      rows: 3,
      description: "Optional — for example, to call ahead to confirm which doctor is in. Only shown once session times are added above.",
    }),
    defineField({
      name: "locationName",
      title: "Venue name",
      type: "string",
      description: "The building or hub the clinic runs from. Leave blank to keep the current wording.",
    }),
    defineField({
      name: "locationAddress",
      title: "Address",
      type: "string",
      description: "Also used for the 'Open in Maps' button. Leave blank to keep the current wording.",
    }),
    defineField({
      name: "locationNotes",
      title: "Getting there notes",
      type: "text",
      rows: 4,
      description: "Parking, access, which room to ask for, and so on. Leave blank to keep the current wording.",
    }),
    defineField({
      name: "services",
      title: "What's available",
      type: "array",
      description:
        "The cards under 'What's available at the Beveridge clinic'. Leave empty to keep the current six. Icons are chosen automatically, in order.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),
  ],
  preview: {
    select: { sessions: "sessions" },
    prepare: ({ sessions }) => ({
      title: "Beveridge Clinic Page",
      subtitle: Array.isArray(sessions) && sessions.length ? `${sessions.length} session time${sessions.length === 1 ? "" : "s"} set` : "Using the standard wording",
    }),
  },
});
