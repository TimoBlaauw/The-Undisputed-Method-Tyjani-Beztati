import "server-only";

const BASE = process.env.GHL_API_BASE || "https://services.leadconnectorhq.com";
const VERSION = "2021-04-15";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v || v === "replace-me") {
    throw new Error(`Missing required env var: ${name}`);
  }
  return v;
}

function headers(): HeadersInit {
  return {
    Authorization: `Bearer ${requireEnv("GHL_API_KEY")}`,
    Version: VERSION,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export type GhlSlot = { startTime: string; endTime: string };
export type NormalizedSlots = { date: string; slots: GhlSlot[] }[];

/**
 * Fetch free slots from GHL and normalize into a date-keyed array.
 * GHL returns an object keyed by YYYY-MM-DD with { slots: string[] } values
 * (each string is an ISO startTime). We attach a 45-minute endTime client-side
 * if GHL doesn't return one — the actual booking still passes both.
 */
export async function fetchFreeSlots(params: {
  startDate: number;
  endDate: number;
  timezone: string;
}): Promise<NormalizedSlots> {
  const calendarId = requireEnv("GHL_CALENDAR_ID");
  const url = new URL(`${BASE}/calendars/${calendarId}/free-slots`);
  url.searchParams.set("startDate", String(params.startDate));
  url.searchParams.set("endDate", String(params.endDate));
  url.searchParams.set("timezone", params.timezone);

  const res = await fetch(url, { headers: headers(), cache: "no-store" });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`GHL free-slots ${res.status}: ${body.slice(0, 300)}`);
  }
  const data = (await res.json()) as Record<string, { slots?: string[] } | unknown>;

  const out: NormalizedSlots = [];
  for (const [date, value] of Object.entries(data)) {
    if (date === "traceId") continue;
    const slotsRaw = (value as { slots?: string[] })?.slots;
    if (!Array.isArray(slotsRaw)) continue;

    const slots: GhlSlot[] = slotsRaw.map((startTime) => {
      const start = new Date(startTime);
      const end = new Date(start.getTime() + 30 * 60 * 1000);
      return { startTime: start.toISOString(), endTime: end.toISOString() };
    });

    if (slots.length > 0) out.push({ date, slots });
  }

  out.sort((a, b) => a.date.localeCompare(b.date));
  return out;
}

export type CreateContactInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  customFields: { key: string; field_value: string }[];
};

export async function createContact(input: CreateContactInput): Promise<string> {
  const locationId = requireEnv("GHL_LOCATION_ID");
  const res = await fetch(`${BASE}/contacts/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      locationId,
      source: "landing_page_meta_ads",
      customFields: input.customFields,
    }),
    cache: "no-store",
  });

  if (res.ok) {
    const data = (await res.json()) as { contact?: { id?: string }; id?: string };
    const id = data.contact?.id ?? data.id;
    if (!id) throw new Error("GHL create-contact: no contact id in response");
    return id;
  }

  // Handle "duplicated contacts" case: GHL rejects the POST but returns the
  // existing contactId in meta. We then PUT the custom fields onto that contact
  // and return its id so the appointment still gets booked.
  if (res.status === 400) {
    const body = await res.text();
    try {
      const parsed = JSON.parse(body) as {
        message?: string;
        meta?: { contactId?: string };
      };
      const existingId = parsed.meta?.contactId;
      const isDuplicate = parsed.message?.toLowerCase().includes("duplicat");
      if (existingId && isDuplicate) {
        await updateExistingContact(existingId, input);
        return existingId;
      }
    } catch {}
    throw new Error(`GHL create-contact 400: ${body.slice(0, 300)}`);
  }

  const body = await res.text().catch(() => "");
  throw new Error(`GHL create-contact ${res.status}: ${body.slice(0, 300)}`);
}

async function updateExistingContact(
  contactId: string,
  input: CreateContactInput,
): Promise<void> {
  // PUT /contacts/{id}. We intentionally omit `email` (that's the dedup match
  // key — don't change it) and `locationId` (inferred from path). Name + phone
  // + customFields all get enriched from the latest form submission.
  const res = await fetch(`${BASE}/contacts/${contactId}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      customFields: input.customFields,
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`GHL update-contact ${res.status}: ${body.slice(0, 300)}`);
  }
}

export type CreateAppointmentInput = {
  contactId: string;
  startTime: string;
  endTime: string;
};

export async function createAppointment(input: CreateAppointmentInput): Promise<string> {
  const calendarId = requireEnv("GHL_CALENDAR_ID");
  const locationId = requireEnv("GHL_LOCATION_ID");

  const res = await fetch(`${BASE}/calendars/events/appointments`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      calendarId,
      locationId,
      contactId: input.contactId,
      startTime: input.startTime,
      endTime: input.endTime,
      appointmentStatus: "confirmed",
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`GHL create-appointment ${res.status}: ${body.slice(0, 300)}`);
  }

  const data = (await res.json()) as { id?: string; appointment?: { id?: string } };
  const id = data.id ?? data.appointment?.id ?? "unknown";
  return id;
}
