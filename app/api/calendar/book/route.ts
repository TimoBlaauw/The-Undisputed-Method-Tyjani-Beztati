import { NextResponse } from "next/server";
import { createContact, createAppointment } from "@/lib/ghl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BookBody = {
  full_name: string;
  email: string;
  phone: string;
  age_bracket: string;
  primary_goal: string;
  weekly_hours: string;
  past_attempts: string;
  timeline: string;
  budget_qualifier: string;
  notes?: string;
  startTime: string;
  endTime: string;
  timezone: string;
};

function splitName(full: string): { firstName: string; lastName: string } {
  const trimmed = full.trim().replace(/\s+/g, " ");
  const idx = trimmed.indexOf(" ");
  if (idx === -1) return { firstName: trimmed, lastName: "" };
  return { firstName: trimmed.slice(0, idx), lastName: trimmed.slice(idx + 1) };
}

export async function POST(request: Request) {
  let body: BookBody;
  try {
    body = (await request.json()) as BookBody;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const required: (keyof BookBody)[] = [
    "full_name", "email", "phone",
    "age_bracket", "primary_goal", "weekly_hours",
    "past_attempts", "timeline", "budget_qualifier",
    "startTime", "endTime",
  ];
  for (const k of required) {
    if (!body[k]) {
      return NextResponse.json(
        { success: false, error: `Missing field: ${k}` },
        { status: 400 },
      );
    }
  }

  const { firstName, lastName } = splitName(body.full_name);

  const customFields = [
    { key: "lead_age_bracket", field_value: body.age_bracket },
    { key: "lead_primary_goal", field_value: body.primary_goal },
    { key: "lead_time_commit", field_value: body.weekly_hours },
    { key: "lead_past_attempts", field_value: body.past_attempts },
    { key: "lead_timeline", field_value: body.timeline },
    { key: "lead_budget_qualifier", field_value: body.budget_qualifier },
  ];
  if (body.notes && body.notes.trim()) {
    customFields.push({ key: "lead_notes", field_value: body.notes.trim() });
  }

  let contactId: string;
  try {
    contactId = await createContact({
      firstName,
      lastName,
      email: body.email,
      phone: body.phone,
      customFields,
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("[/api/calendar/book] createContact failed", detail);
    return NextResponse.json(
      {
        success: false,
        error: "Couldn't save your details. Please try again.",
        debug: { step: "createContact", detail, payload: { firstName, lastName, email: body.email, phone: body.phone, customFields } },
      },
      { status: 502 },
    );
  }

  try {
    const appointmentId = await createAppointment({
      contactId,
      startTime: body.startTime,
      endTime: body.endTime,
    });
    return NextResponse.json({ success: true, appointmentId });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("[/api/calendar/book] createAppointment failed", detail);
    return NextResponse.json(
      {
        success: false,
        error: "That slot is no longer available. Please pick another time.",
        debug: { step: "createAppointment", detail, payload: { contactId, startTime: body.startTime, endTime: body.endTime } },
      },
      { status: 409 },
    );
  }
}
