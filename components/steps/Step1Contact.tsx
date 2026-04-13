"use client";

import { useMemo, useState } from "react";
import {
  getCountries,
  getCountryCallingCode,
  AsYouType,
  parsePhoneNumber,
} from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import type { FormData } from "@/lib/validation";

const PRIORITY: CountryCode[] = ["NL", "BE", "DE", "GB", "FR", "ES", "US"];

type Errors = Partial<Record<keyof FormData, string>>;

type Props = {
  data: FormData;
  errors: Errors;
  onChange: (patch: Partial<FormData>) => void;
};

function parseInitial(phone: string): { country: CountryCode; local: string } {
  if (!phone) return { country: "NL", local: "" };
  try {
    const parsed = parsePhoneNumber(phone);
    if (parsed?.country) {
      return { country: parsed.country, local: parsed.nationalNumber || "" };
    }
  } catch {}
  return { country: "NL", local: "" };
}

function toE164(country: CountryCode, local: string): string {
  if (!local.trim()) return "";
  const formatter = new AsYouType(country);
  formatter.input(local);
  return (
    formatter.getNumber()?.number ??
    `+${getCountryCallingCode(country)}${local.replace(/\D/g, "")}`
  );
}

export default function Step1Contact({ data, errors, onChange }: Props) {
  const initial = useMemo(() => parseInitial(data.phone), [data.phone]);
  const [country, setCountry] = useState<CountryCode>(initial.country);
  const [localNumber, setLocalNumber] = useState(initial.local);

  const allCountries = useMemo(() => {
    const all = getCountries();
    const rest = all.filter((c) => !PRIORITY.includes(c)).sort();
    return [...PRIORITY, ...rest];
  }, []);

  const handleCountry = (c: CountryCode) => {
    setCountry(c);
    onChange({ phone: toE164(c, localNumber) });
  };

  const handleLocal = (v: string) => {
    setLocalNumber(v);
    onChange({ phone: toE164(country, v) });
  };

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
            onChange={(e) => handleCountry(e.target.value as CountryCode)}
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
            onChange={(e) => handleLocal(e.target.value)}
          />
        </div>
        {errors.phone && <span className="field-error">{errors.phone}</span>}
        <span className="field-help">We&apos;ll send SMS reminders 24h and 1h before your call.</span>
      </div>
    </>
  );
}
