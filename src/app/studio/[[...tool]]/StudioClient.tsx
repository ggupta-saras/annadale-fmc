"use client";

import { NextStudio } from "next-sanity/studio/client-component";
import config from "../../../../sanity.config";

// Import the config directly inside a client component — avoids passing it
// as a serialised prop across the RSC boundary, which is the likely root cause
// of the production.api.sanity.io auth URL bug in Turbopack / Next.js 16.
export function StudioClient() {
  return <NextStudio config={config} />;
}
