"use client";

import { useEffect, useMemo, useState } from "react";
import { getCountries, getCountryCallingCode, AsYouType } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import type { FormData } from "@/lib/validation";

const PRIORITY: CountryCode[] = ["NL", "BE", "DE", "GB", "FR", "ES", "US"];

type Errors = Partial<Record<keyof FormData, string>>;

type Props = {
  data: FormData;
  errors: Errors;
  onChange: (patch: Partial<FormData>) => void;
};

export default function Step1Contact({ data, errors, onChange }: Props) {
  const [country, setCountry] = useState<CountryCode>("NL");
  const [localNumber, setLocalNumber] = useState("");

  const allCountries = useMemo(() => {
    const all = getCountries();
    const rest = all.filter((c) => !PRIORITY.includes(c)).sort();
    return [...PRIORITY, ...rest];
  }, []);

  // Sync the combined E.164 phone whenever country or local number changes.
  useEffect(() => {
    if (!localNumber.trim()) {
      if (data.phone) onChange({ phone: "" });
      return;
    }
    const formatter = new AsYouType(country);
    formatter.input(localNumber);
    const e164 = formatter.getNumber()?.number ?? `+${getCountryCallingCode(country)}${localNumber.replace(/\D/g, "")}`;
    if (e164 !== data.phone) onChange({ phone: e164 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, localNumber]);

  return (
    <>
      <h3>Apply for Coaching</h3>
      <p className="modal-sub">Tell us how to reach you. Takes 2 minutes.</p>

      <div className={`form-group${errors.full_name ? " has-error" : ""}`}>
        <label htmlFor="full_name">Full name</label>
        <input
          id="full_name"
          type="text"
          autoComplete="name"
          placeholder="John Doe"
          value={data.full_name}
          onChange={(e) => onChange({ full_name: e.target.value })}
        />
        {errors.full_name && <span className="field-error">{errors.full_name}</span>}
      </div>

      <div className={`form-group${errors.email ? " has-error" : ""}`}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="john@example.com"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className={`form-group${errors.phone ? " has-error" : ""}`}>
        <label htmlFor="phone">Phone number (incl. country code)</label>
        <div className="phone-row">
          <select
            aria-label="Country code"
            value={country}
            onChange={(e) => setCountry(e.target.value as CountryCode)}
          >
            {allCountries.map((c) => (
              <option key={c} value={c}>
                {c} +{getCountryCallingCode(c)}
              </option>
            ))}
          </select>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="6 1234 5678"
            value={localNumber}
            onChange={(e) => setLocalNumber(e.target.value)}
          />
        </div>
        {errors.phone && <span className="field-error">{errors.phone}</span>}
        <span className="field-help">We&apos;ll send SMS reminders 24h and 1h before your call.</span>
      </div>
    </>
  );
}
