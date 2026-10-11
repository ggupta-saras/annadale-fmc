import { client } from "@/sanity/lib/client";
import { resolveWeek, weekHours, type DayHours, type OpeningHoursDoc } from "./hours";

const DAY_FIELDS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  .map((d) => `${d}{ open, close, location, clearLocation }`)
  .join(", ");

/**
 * The week the site displays: the Opening Hours document in Studio layered over
 * the defaults in lib/hours.ts. Falls back to the defaults if there is no
 * document or Sanity cannot be reached, so the hours never disappear.
 * Publishing in Studio refreshes through /api/revalidate (tag "openingHours")
 * once a webhook exists; until then the one-hour timer picks it up.
 */
export async function getOpeningHours(): Promise<DayHours[]> {
  try {
    const doc: OpeningHoursDoc | null = await client.fetch(
      `*[_type == "openingHours"][0]{ ${DAY_FIELDS} }`,
      {},
      { next: { tags: ["openingHours"], revalidate: 3600 } }
    );
    return resolveWeek(doc);
  } catch {
    return weekHours;
  }
}
