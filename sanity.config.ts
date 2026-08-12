'use client'

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemas";

const SERVICES_API_VERSION = "2024-01-01";

export default defineConfig({
  basePath: "/studio",
  name: "annadale-fmc",
  title: "Annadale FMC",
  projectId: "38z2bpae",
  dataset: "production",
  schema: {
    ...schema,
    // Lets the "Allied Health" list below pre-fill category on create,
    // so admins don't have to remember to set the dropdown themselves.
    templates: (prev) => [
      ...prev,
      {
        id: "service-allied-health",
        title: "Service: Allied Health",
        schemaType: "service",
        value: { category: "Allied Health" },
      },
    ],
  },
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
            S.divider(),
            // Split from a single flat "Services" list into two clearly
            // separated sections — GP services vs allied health — so
            // editors aren't scrolling through one mixed list to find
            // either kind.
            S.listItem()
              .title("Services")
              .child(
                S.documentList()
                  .apiVersion(SERVICES_API_VERSION)
                  .title("Services")
                  .schemaType("service")
                  .filter('_type == "service" && category != "Allied Health"')
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
            S.listItem()
              .title("Allied Health")
              .child(
                S.documentList()
                  .apiVersion(SERVICES_API_VERSION)
                  .title("Allied Health")
                  .schemaType("service")
                  .filter('_type == "service" && category == "Allied Health"')
                  .defaultOrdering([{ field: "order", direction: "asc" }])
                  .initialValueTemplates([
                    S.initialValueTemplateItem("service-allied-health"),
                  ])
              ),
            S.listItem()
              .title("Allied Health Page")
              .child(
                S.document()
                  .schemaType("alliedHealthPage")
                  .documentId("alliedHealthPage")
              ),
            S.documentTypeListItem("alliedHealthPractitioner").title("Allied Health Practitioners"),
            S.divider(),
            S.documentTypeListItem("announcement").title("Announcements"),
          ]),
    }),
  ],
});
