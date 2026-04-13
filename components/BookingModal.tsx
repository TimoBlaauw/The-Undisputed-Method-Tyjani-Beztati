"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  initialFormData,
  validateStep1,
  validateStep2,
  validateStep3,
  type FormData,
} from "@/lib/validation";
import Step1Contact from "./steps/Step1Contact";
import Step2Qualification from "./steps/Step2Qualification";
import Step3Context from "./steps/Step3Context";
import Step4Calendar from "./steps/Step4Calendar";
import type { Slot } from "./Calendar";

const STORAGE_KEY = "tum-booking-draft";

type Errors = Partial<Record<keyof FormData, string>>;

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [data, setData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [bookError, setBookError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const timezone = useMemo(() => {
    if (typeof window === "undefined") return "Europe/Amsterdam";
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Amsterdam";
  }, []);

  // Restore draft on mount (both form data and current step).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { data?: Partial<FormData>; step?: number };
        if (parsed.data) setData((d) => ({ ...d, ...parsed.data }));
        if (parsed.step && parsed.step >= 1 && parsed.step <= 4) {
          setStep(parsed.step as 1 | 2 | 3 | 4);
        }
      }
    } catch {}
  }, []);

  // Persist draft on changes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, step }));
    } catch {}
  }, [data, step]);

  // Bind global "open-booking" CTAs from the static landing page markup.
  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const trigger = target?.closest?.(".open-booking");
      if (trigger) {
        e.preventDefault();
        openModal();
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Esc to close, lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const openModal = useCallback(() => {
    setOpen(true);
    setErrors({});
    setBookError(null);
    // Keep step + data as-is — persisted via localStorage, so reopening
    // after an accidental outside-click lands on the same step with everything filled.
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const update = useCallback((patch: Partial<FormData>) => {
    setData((d) => ({ ...d, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(patch) as (keyof FormData)[]) {
        delete next[k];
      }
      return next;
    });
  }, []);

  const validateCurrentStep = useCallback((): Errors => {
    if (step === 1) return validateStep1(data);
    if (step === 2) return validateStep2(data);
    if (step === 3) return validateStep3(data);
    return {};
  }, [step, data]);

  const stepValid = useMemo(() => {
    return Object.keys(validateCurrentStep()).length === 0;
  }, [validateCurrentStep]);

  const goNext = useCallback(() => {
    const e = validateCurrentStep();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep((s) => (Math.min(4, s + 1) as 1 | 2 | 3 | 4));
  }, [validateCurrentStep]);

  const goBack = useCallback(() => {
    setErrors({});
    setStep((s) => (Math.max(1, s - 1) as 1 | 2 | 3 | 4));
  }, []);

  const submitBooking = useCallback(async () => {
    if (!selectedSlot) return;
    setSubmitting(true);
    setBookError(null);
    try {
      const res = await fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          timezone,
        }),
      });
      const json = (await res.json()) as { success: boolean; error?: string };
      if (!res.ok || !json.success) {
        setBookError(json.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
      window.location.href = "/bedankt";
    } catch {
      setBookError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  }, [data, selectedSlot, timezone]);

  // Enter to advance (except inside textareas).
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key !== "Enter") return;
      const target = e.target as HTMLElement;
      if (target.tagName === "TEXTAREA") return;
      e.preventDefault();
      if (step < 4) goNext();
      else if (selectedSlot && !submitting) submitBooking();
    },
    [step, goNext, selectedSlot, submitting, submitBooking],
  );

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) closeModal();
  };

  const nextDisabled = step < 4 ? !stepValid : !selectedSlot || submitting;

  return (
    <div
      ref={overlayRef}
      className={`modal-overlay${open ? " active" : ""}`}
      onClick={onOverlayClick}
      aria-hidden={!open}
    >
      <div className={`modal${step === 4 ? " modal-wide" : ""}`} role="dialog" aria-modal="true">
        <button type="button" className="modal-close" onClick={closeModal} aria-label="Close">×</button>

        <span className="modal-step-label">Step {step} of 4</span>
        <div className="modal-progress" aria-hidden="true">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`modal-progress-step${i < step ? " completed" : ""}${i === step ? " active" : ""}`}
            />
          ))}
        </div>

        <form onKeyDown={onKeyDown} onSubmit={(e) => e.preventDefault()} noValidate>
          {step === 1 && <Step1Contact data={data} errors={errors} onChange={update} />}
          {step === 2 && <Step2Qualification data={data} errors={errors} onChange={update} />}
          {step === 3 && <Step3Context data={data} errors={errors} onChange={update} />}
          {step === 4 && (
            <Step4Calendar
              timezone={timezone}
              selected={selectedSlot}
              onSelect={setSelectedSlot}
            />
          )}

          {bookError && (
            <p className="field-error" style={{ textAlign: "center", marginTop: 12 }}>
              {bookError}
            </p>
          )}

          <div className="modal-buttons">
            {step > 1 && step < 4 && (
              <button type="button" className="btn btn-secondary" onClick={goBack}>
                Back
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={goNext}
                disabled={nextDisabled}
              >
                {step === 3 ? "Continue to Booking" : "Next"}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={submitBooking}
                disabled={nextDisabled}
              >
                {submitting ? "Booking…" : "Confirm Booking"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
