"use client";

import type { FormData } from "@/lib/validation";

type Errors = Partial<Record<keyof FormData, string>>;

type Props = {
  data: FormData;
  errors: Errors;
  onChange: (patch: Partial<FormData>) => void;
};

const TIMELINES = [
  "Immediately — I'm ready now",
  "Within 2 weeks",
  "Within a month",
  "I'm just exploring for now",
];

const BUDGET_OPTIONS = [
  "Yes, I understand it's an investment",
  "I need to know the price before I can answer that",
  "I'm looking for something affordable",
];

export default function Step3Context({ data, errors, onChange }: Props) {
  return (
    <>
      <h3>Tell us where you are</h3>
      <p className="modal-sub">Be honest. The more we know, the better the call.</p>

      <div className={`form-group${errors.past_attempts ? " has-error" : ""}`}>
        <label htmlFor="past_attempts">What have you tried so far, and what&apos;s still missing?</label>
        <textarea
          id="past_attempts"
          rows={4}
          maxLength={2000}
          placeholder="Other coaches, gyms, diets, apps — what worked partially, what didn't stick, what's still missing."
          value={data.past_attempts}
          onChange={(e) => onChange({ past_attempts: e.target.value })}
        />
        {errors.past_attempts && <span className="field-error">{errors.past_attempts}</span>}
      </div>

      <div className={`form-group${errors.timeline ? " has-error" : ""}`}>
        <label htmlFor="timeline">When do you want to start?</label>
        <select
          id="timeline"
          value={data.timeline}
          onChange={(e) => onChange({ timeline: e.target.value })}
        >
          <option value="" disabled>Select timeline</option>
          {TIMELINES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.timeline && <span className="field-error">{errors.timeline}</span>}
      </div>

      <div className={`form-group${errors.budget_qualifier ? " has-error" : ""}`}>
        <label htmlFor="budget_qualifier">Are you prepared to invest in yourself through elite coaching?</label>
        <select
          id="budget_qualifier"
          value={data.budget_qualifier}
          onChange={(e) => onChange({ budget_qualifier: e.target.value })}
        >
          <option value="" disabled>Select an answer</option>
          {BUDGET_OPTIONS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        {errors.budget_qualifier && <span className="field-error">{errors.budget_qualifier}</span>}
      </div>

      <div className={`form-group${errors.notes ? " has-error" : ""}`}>
        <label htmlFor="notes">Anything Tyjani should know before the call? <span style={{color:"var(--gray)",fontWeight:400,letterSpacing:"normal",textTransform:"none"}}>(optional)</span></label>
        <textarea
          id="notes"
          rows={3}
          maxLength={2000}
          placeholder="Injuries, specific questions, timing constraints — anything relevant."
          value={data.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
        />
        {errors.notes && <span className="field-error">{errors.notes}</span>}
      </div>
    </>
  );
}
