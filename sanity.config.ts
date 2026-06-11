'use client'

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemas";

export default defineConfig({
  basePath: "/studio",
  name: "annadale-fmc",
  title: "Annadale FMC",
  projectId: "38z2bpae",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Home Page")
              .child(
                S.document()
                  .schemaType("homepage")
                  .documentId("homepage")
              ),
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
  ],
  schema,
});
