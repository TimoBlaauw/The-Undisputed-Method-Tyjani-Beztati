"use client";

import type { FormData } from "@/lib/validation";

type Errors = Partial<Record<keyof FormData, string>>;

type Props = {
  data: FormData;
  errors: Errors;
  onChange: (patch: Partial<FormData>) => void;
};

const AGES = ["Under 18", "18–24", "25–34", "35–44", "45–54", "55+"];
const GOALS = [
  "Fat loss & physique transformation",
  "Athletic performance",
  "Discipline & mindset",
  "Overall lifestyle upgrade",
];
const HOURS = ["Less than 3 hours", "3–5 hours", "5–8 hours", "8+ hours"];

export default function Step2Qualification({ data, errors, onChange }: Props) {
  return (
    <>
      <h3>A few quick questions</h3>
      <p className="modal-sub">So Tyjani knows what you&apos;re working with.</p>

      <div className={`form-group${errors.age_bracket ? " has-error" : ""}`}>
        <label htmlFor="age_bracket">How old are you?</label>
        <select
          id="age_bracket"
          value={data.age_bracket}
          onChange={(e) => onChange({ age_bracket: e.target.value })}
        >
          <option value="" disabled>Select age</option>
          {AGES.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        {errors.age_bracket && <span className="field-error">{errors.age_bracket}</span>}
      </div>

      <div className={`form-group${errors.primary_goal ? " has-error" : ""}`}>
        <label htmlFor="primary_goal">What&apos;s your primary goal?</label>
        <select
          id="primary_goal"
          value={data.primary_goal}
          onChange={(e) => onChange({ primary_goal: e.target.value })}
        >
          <option value="" disabled>Select your goal</option>
          {GOALS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        {errors.primary_goal && <span className="field-error">{errors.primary_goal}</span>}
      </div>

      <div className={`form-group${errors.weekly_hours ? " has-error" : ""}`}>
        <label htmlFor="weekly_hours">How many hours per week can you realistically commit to training?</label>
        <select
          id="weekly_hours"
          value={data.weekly_hours}
          onChange={(e) => onChange({ weekly_hours: e.target.value })}
        >
          <option value="" disabled>Select hours</option>
          {HOURS.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
        {errors.weekly_hours && <span className="field-error">{errors.weekly_hours}</span>}
      </div>
    </>
  );
}
