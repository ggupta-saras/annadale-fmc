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
      description: "Only for Nurse / Practice Nurse — front-of-house roles don't show a photo.",
      hidden: ({ parent }) => {
        const role = (parent as { role?: string } | undefined)?.role;
        return role !== "Nurse" && role !== "Practice Nurse";
      },
    }),
    defineField({
      name: "bio",
      title: "Short Bio",
      type: "text",
      rows: 3,
      description: "50 words max — shown on the Our Team page.",
      validation: (Rule) =>
        Rule.custom((text: string | undefined) => {
          if (!text) return true;
          const count = text.trim().split(/\s+/).filter(Boolean).length;
          return count <= 50 || `${count} words — please trim to 50 or fewer.`;
        }),
    }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
