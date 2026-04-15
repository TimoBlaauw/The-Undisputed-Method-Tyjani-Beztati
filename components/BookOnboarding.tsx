"use client";

import { useCallback, useMemo, useState } from "react";
import Calendar, { type Slot } from "@/components/Calendar";

type Props = {
  email: string;
  firstName: string;
  lastName: string;
};

export default function BookOnboarding({ email, firstName, lastName }: Props) {
  const [selected, setSelected] = useState<Slot | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timezone = useMemo(() => {
    if (typeof window === "undefined") return "Europe/Amsterdam";
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Amsterdam";
  }, []);

  const confirm = useCallback(async () => {
    if (!selected) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/calendar/book-onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          startTime: selected.startTime,
          endTime: selected.endTime,
          timezone,
        }),
      });
      const json = (await res.json()) as { success: boolean; error?: string };
      if (!res.ok || !json.success) {
        setError(json.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      window.location.href = "/confirmation";
    } catch {
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  }, [selected, email, firstName, lastName, timezone]);

  return (
    <div
      style={{
        background: "var(--dark)",
        border: "1px solid var(--dark-border)",
        borderRadius: "var(--radius-lg)",
        padding: "48px 40px",
        margin: "0 auto",
        maxWidth: 900,
        textAlign: "left",
      }}
    >
      <h3 style={{ textAlign: "center", marginTop: 0, marginBottom: 6, fontSize: 22 }}>
        Welcome, {firstName}. Pick a time for your onboarding call.
      </h3>
      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "var(--gray)",
          marginBottom: 28,
        }}
      >
        Choose any available slot below. Once confirmed you&apos;ll receive a calendar
        invite at <strong>{email}</strong>.
      </p>

      <Calendar
        timezone={timezone}
        selected={selected}
        onSelect={setSelected}
        slotsEndpoint="/api/calendar/onboarding-slots"
      />

      {error && (
        <p className="field-error" style={{ textAlign: "center", marginTop: 12 }}>
          {error}
        </p>
      )}

      <div className="modal-buttons" style={{ justifyContent: "center" }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={confirm}
          disabled={!selected || submitting}
        >
          {submitting ? "Booking…" : "Confirm Onboarding Call"}
        </button>
      </div>
    </div>
  );
}
