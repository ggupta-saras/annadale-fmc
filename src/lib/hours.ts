// Opening hours. The home-page card, contact page, footer and the header strip
// all read the same week, so a change is made once. The values below are the
// defaults; anything the clinic sets in Studio (Opening Hours) overrides them
// per field, see resolveWeek() and lib/getHours.ts.

export type DayHours = {
  /** 0 = Sunday … 6 = Saturday, the same numbering as Date.getDay(). */
  dow: number;
  short: string;
  long: string;
  open: string;
  close: string;
  /** Set when that day's hours apply to one site only, e.g. "Beveridge Clinic". */
  location?: string;
};

// Monday first, as the site displays them. These are the fallbacks used for any
// day, time or location the clinic has not set in Studio.
export const weekHours: DayHours[] = [
  { dow: 1, short: "Mon", long: "Monday",    open: "9:00am",  close: "5:30pm" },
  { dow: 2, short: "Tue", long: "Tuesday",   open: "9:00am",  close: "5:30pm" },
  { dow: 3, short: "Wed", long: "Wednesday", open: "9:00am",  close: "5:30pm" },
  { dow: 4, short: "Thu", long: "Thursday",  open: "9:00am",  close: "5:30pm" },
  { dow: 5, short: "Fri", long: "Friday",    open: "9:00am",  close: "5:30pm" },
  { dow: 6, short: "Sat", long: "Saturday",  open: "11:00am", close: "5:00pm", location: "Beveridge Clinic" },
  { dow: 0, short: "Sun", long: "Sunday",    open: "9:00am",  close: "4:00pm" },
];

/** "9:00am – 5:30pm", or "9:00 – 5:30" when compact (the home-page card). */
export function formatRange(d: DayHours, compact = false): string {
  const t = (s: string) => (compact ? s.replace(/(am|pm)$/, "") : s);
  return `${t(d.open)} – ${t(d.close)}`;
}

export type HoursRow = { day: string; time: string; note?: string };

/** Consecutive days with identical hours collapse to one row: "Monday – Friday". */
export function groupedHours(week: DayHours[] = weekHours): HoursRow[] {
  const rows: HoursRow[] = [];
  let run: DayHours[] = [];
  const flush = () => {
    if (!run.length) return;
    const first = run[0];
    const last = run[run.length - 1];
    rows.push({
      day: run.length > 1 ? `${first.long} – ${last.long}` : first.long,
      time: formatRange(first),
      note: first.location,
    });
  };
  for (const d of week) {
    const prev = run[run.length - 1];
    if (prev && prev.open === d.open && prev.close === d.close && prev.location === d.location) {
      run.push(d);
    } else {
      flush();
      run = [d];
    }
  }
  flush();
  return rows;
}

const DOW_BY_NAME: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/**
 * Today's weekday number in the clinic's own timezone. A server (or a visitor)
 * in another timezone would otherwise see the wrong day highlighted for hours
 * either side of midnight; Vercel runs in UTC, which is 10–11 hours behind.
 */
export function clinicDow(now: Date = new Date()): number {
  const name = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "Australia/Melbourne" }).format(now);
  return DOW_BY_NAME[name] ?? now.getDay();
}

/** One-line summary for the header strip, e.g. "Open today · 11:00am – 5:00pm (Beveridge Clinic)". */
export function todayLine(dow: number, week: DayHours[] = weekHours): string {
  const d = week.find((h) => h.dow === dow);
  if (!d) return "Open 7 days";
  return `Open today · ${formatRange(d)}${d.location ? ` (${d.location})` : ""}`;
}

/** Rows for the contact page and footer: the grouped week plus the fixed holiday line. */
export function hoursRows(week: DayHours[] = weekHours): HoursRow[] {
  return [...groupedHours(week), { day: "Public Holidays", time: "Closed" }];
}

/** What Studio stores for one day. Every field is optional. */
export type DayHoursOverride = {
  open?: string | null;
  close?: string | null;
  location?: string | null;
  /** Tick to drop the location note a day has by default (e.g. Saturday's "Beveridge Clinic"). */
  clearLocation?: boolean | null;
};

/** The Opening Hours document, keyed by lower-case weekday name. */
export type OpeningHoursDoc = Partial<Record<"monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday", DayHoursOverride | null>>;

const clean = (v: string | null | undefined) => (typeof v === "string" && v.trim() ? v.trim() : undefined);

/**
 * Layers the Studio document over the defaults, field by field. With no
 * document, or an empty one, this returns exactly `weekHours`.
 */
export function resolveWeek(doc: OpeningHoursDoc | null | undefined): DayHours[] {
  if (!doc) return weekHours;
  return weekHours.map((d) => {
    const o = doc[d.long.toLowerCase() as keyof OpeningHoursDoc];
    if (!o) return d;
    const location = o.clearLocation ? undefined : clean(o.location) ?? d.location;
    const next: DayHours = { ...d, open: clean(o.open) ?? d.open, close: clean(o.close) ?? d.close };
    if (location) next.location = location;
    else delete next.location;
    return next;
  });
}
