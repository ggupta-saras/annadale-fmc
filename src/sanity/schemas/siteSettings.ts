import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "clinicName", title: "Clinic Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "phone", title: "Phone Number", type: "string" }),
    defineField({ name: "afterHoursPhone", title: "After Hours Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        defineField({ name: "street", title: "Street", type: "string" }),
        defineField({ name: "suburb", title: "Suburb", type: "string" }),
        defineField({ name: "state", title: "State", type: "string" }),
        defineField({ name: "postcode", title: "Postcode", type: "string" }),
      ],
    }),
    defineField({
      name: "openingHours",
      title: "Opening Hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "day", title: "Day(s)", type: "string" }),
            defineField({ name: "hours", title: "Hours", type: "string" }),
          ],
          preview: {
            select: { title: "day", subtitle: "hours" },
          },
        },
      ],
    }),
    defineField({ name: "bookingUrl", title: "Online Booking URL", type: "url" }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({
      name: "heroTagline",
      title: "Hero Tagline (home page)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "aboutUsText",
      title: "About Us Text",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: { title: "clinicName" },
  },
});
