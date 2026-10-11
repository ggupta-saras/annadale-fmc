import { defineField, defineType } from "sanity";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Matches how the site writes times: 9:00am, 5:30pm, 11:00am.
const TIME = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(am|pm)$/i;

// Every field is optional. Anything left blank keeps the hours the site already
// shows (the defaults in src/lib/hours.ts), so an empty document changes
// nothing and the clinic can change one day at a time.
const dayField = (day: string) =>
  defineField({
    name: day.toLowerCase(),
    title: day,
    type: "object",
    options: { columns: 2 },
    fields: [
      defineField({
        name: "open",
        title: "Opens",
        type: "string",
        description: "For example 9:00am. Leave blank to keep the current time.",
        validation: (rule) => rule.custom((v) => (!v || TIME.test(v.trim()) ? true : "Write the time like 9:00am or 5:30pm")),
      }),
      defineField({
        name: "close",
        title: "Closes",
        type: "string",
        description: "For example 5:30pm. Leave blank to keep the current time.",
        validation: (rule) => rule.custom((v) => (!v || TIME.test(v.trim()) ? true : "Write the time like 9:00am or 5:30pm")),
      }),
      defineField({
        name: "location",
        title: "Location note",
        type: "string",
        description: "Shown in brackets after the day, for example Beveridge Clinic. Leave blank to keep the current note, if any.",
      }),
      defineField({
        name: "clearLocation",
        title: "Remove the location note",
        type: "boolean",
        description: "Tick this to show no location note for this day, even if it currently has one.",
        initialValue: false,
      }),
    ],
    preview: {
      select: { open: "open", close: "close", location: "location", clear: "clearLocation" },
      prepare: ({ open, close, location, clear }) => ({
        title: day,
        subtitle: open || close || location || clear ? [open, close].filter(Boolean).join(" – ") + (location ? ` (${location})` : "") || "Edited" : "Using the standard hours",
      }),
    },
  });

export const openingHours = defineType({
  name: "openingHours",
  title: "Opening Hours",
  type: "document",
  description:
    "The hours shown on the home page, contact page, footer and the strip at the top of every page. Days with the same hours are grouped automatically (Monday – Friday). Public holidays are not editable here.",
  fields: DAYS.map(dayField),
  preview: {
    prepare: () => ({ title: "Opening Hours" }),
  },
});
