import { StudioClient } from "./StudioClient";

// Statically render the Studio shell — content loads client-side.
export const dynamic = "force-static";

// Use next-sanity's recommended metadata/viewport defaults (noindex, mobile scaling).
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <StudioClient />;
}
