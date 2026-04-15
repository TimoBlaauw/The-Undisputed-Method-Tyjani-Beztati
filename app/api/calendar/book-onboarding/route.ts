import { NextResponse } from "next/server";
import { createContact, createAppointment } from "@/lib/ghl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BookBody = {
  email: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  startTime: string;
  endTime: string;
  timezone?: string;
};

function onboardingCalendarId(): string | undefined {
  return process.env.GHL_ONBOARDING_CALENDAR_ID || undefined;
}

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(request: Request) {
  let body: BookBody;
  try {
    body = (await request.json()) as BookBody;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.email || !isValidEmail(body.email)) {
    return NextResponse.json({ success: false, error: "Invalid email." }, { status: 400 });
  }
  if (!body.firstName || !body.firstName.trim()) {
    return NextResponse.json({ success: false, error: "Missing firstName." }, { status: 400 });
  }
  if (!body.startTime || !body.endTime) {
    return NextResponse.json({ success: false, error: "Missing slot." }, { status: 400 });
  }

  // GHL Smart Matching: passing the same email on createContact either creates
  // a new record or returns the existing contact's id. Either way, the
  // appointment is attached to the original contact (with its status:paid tag).
  let contactId: string;
  try {
    contactId = await createContact({
      firstName: body.firstName.trim(),
      lastName: (body.lastName || "").trim(),
      email: body.email.trim(),
      phone: (body.phone || "").trim(),
      customFields: [],
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("[/api/calendar/book-onboarding] createContact failed", detail);
    return NextResponse.json(
      { success: false, error: "Couldn't resolve your account. Please contact support." },
      { status: 502 },
    );
  }

  try {
    const appointmentId = await createAppointment({
      contactId,
      startTime: body.startTime,
      endTime: body.endTime,
      calendarId: onboardingCalendarId(),
    });
    return NextResponse.json({ success: true, appointmentId });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("[/api/calendar/book-onboarding] createAppointment failed", detail);
    return NextResponse.json(
      { success: false, error: "That slot is no longer available. Please pick another time." },
      { status: 409 },
    );
  }
}
