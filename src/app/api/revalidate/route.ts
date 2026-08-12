import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Sanity webhook endpoint. Configure a webhook in your Sanity project
// (Manage → API → Webhooks) pointing to:
//   https://www.annadalefmc.com.au/api/revalidate?secret=YOUR_SECRET
// Trigger on: Create, Update, Delete
// Filter:     _type in ["homepage", "doctor", "staffMember", "service", "alliedHealthPage", "alliedHealthPractitioner"]
// Projection: {"_type": _type}
// and set SANITY_REVALIDATE_SECRET in Vercel to the same value.
// Publishing a document then refreshes the site immediately.

const TAG_BY_TYPE: Record<string, string> = {
  homepage: "homepage",
  doctor: "doctors",
  staffMember: "staff",
  service: "services",
  alliedHealthPage: "alliedHealthPage",
  alliedHealthPractitioner: "alliedHealthPractitioners",
};

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const type = body?._type as string | undefined;
  const tag = type ? TAG_BY_TYPE[type] : undefined;

  if (!tag) {
    return NextResponse.json({ revalidated: false, message: `No cache tag mapped for type "${type}"` });
  }

  // { expire: 0 } forces immediate expiration — appropriate here since an
  // external system (Sanity) is telling us content changed and expects the
  // site to reflect it right away, rather than the lazier "max" stale-while-
  // revalidate profile meant for user-triggered revalidation.
  revalidateTag(tag, { expire: 0 });
  return NextResponse.json({ revalidated: true, tag, now: Date.now() });
}
