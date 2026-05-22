import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "@/sanity/schemas";

export default defineConfig({
  name: "annadale-fmc",
  title: "Annadale FMC",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            S.documentTypeListItem("doctor").title("Doctors"),
            S.documentTypeListItem("staffMember").title("Staff Members"),
            S.documentTypeListItem("service").title("Services"),
            S.documentTypeListItem("announcement").title("Announcements"),
          ]),
    }),
    visionTool(),
  ],
  schema,
});
