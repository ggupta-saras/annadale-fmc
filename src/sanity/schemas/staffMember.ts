import { defineField, defineType } from "sanity";

export const staffMember = defineType({
  name: "staffMember",
  title: "Staff Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string" }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "Practice Manager", value: "Practice Manager" },
          { title: "Nurse", value: "Nurse" },
          { title: "Practice Nurse", value: "Practice Nurse" },
          { title: "Receptionist", value: "Receptionist" },
          { title: "Administration", value: "Administration" },
        ],
      },
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "bio", title: "Short Bio", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
