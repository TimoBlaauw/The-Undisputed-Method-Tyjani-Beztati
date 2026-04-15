import { NextResponse } from "next/server";
import { fetchFreeSlots } from "@/lib/ghl";
import { getCached, setCached } from "@/lib/slotCache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function onboardingCalendarId(): string {
  return process.env.GHL_ONBOARDING_CALENDAR_ID || process.env.GHL_CALENDAR_ID || "";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const startDate = Number(url.searchParams.get("startDate"));
  const endDate = Number(url.searchParams.get("endDate"));
  const timezone = url.searchParams.get("timezone") || "Europe/Amsterdam";

  if (!Number.isFinite(startDate) || !Number.isFinite(endDate) || endDate <= startDate) {
    return NextResponse.json(
      { error: "Invalid startDate or endDate" },
      { status: 400 },
    );
  }

  const calendarId = onboardingCalendarId();
  const slotDurationMinutes = Number(process.env.GHL_ONBOARDING_SLOT_MINUTES) || 60;
  const cacheKey = `onboarding:${calendarId}:${slotDurationMinutes}:${timezone}:${startDate}:${endDate}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json({ slots: cached, cached: true });
  }

  try {
    const slots = await fetchFreeSlots({ startDate, endDate, timezone, calendarId, slotDurationMinutes });
    setCached(cacheKey, slots);
    return NextResponse.json({ slots, cached: false });
  } catch (err) {
    console.error("[/api/calendar/onboarding-slots]", err);
    return NextResponse.json(
      { error: "Failed to fetch availability." },
      { status: 502 },
    );
  }
}
