import { isValidPhoneNumber } from "libphonenumber-js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateFullName(value: string): string | null {
  const v = value.trim();
  if (v.length < 2) return "Please enter your full name.";
  if (!v.includes(" ")) return "Please enter both first and last name.";
  return null;
}

export function validateEmail(value: string): string | null {
  const v = value.trim();
  if (!v) return "Email is required.";
  if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
  return null;
}

export function validatePhone(value: string): string | null {
  const v = value.trim();
  if (!v) return "Phone number is required.";
  if (!isValidPhoneNumber(v)) return "Please enter a valid phone number with country code.";
  return null;
}

export function validateRequired(value: string, label = "This field"): string | null {
  if (!value || !value.trim()) return `${label} is required.`;
  return null;
}

export function validateMinLength(value: string, min: number, label = "This field"): string | null {
  if (!value || value.trim().length < min) {
    return `${label} must be at least ${min} characters.`;
  }
  return null;
}

export function validateMaxLength(value: string, max: number, label = "This field"): string | null {
  if (value && value.length > max) {
    return `${label} must be at most ${max} characters.`;
  }
  return null;
}

export type FormData = {
  full_name: string;
  email: string;
  phone: string;
  age_bracket: string;
  primary_goal: string;
  weekly_hours: string;
  past_attempts: string;
  timeline: string;
  budget_qualifier: string;
  notes: string;
};

export const initialFormData: FormData = {
  full_name: "",
  email: "",
  phone: "",
  age_bracket: "",
  primary_goal: "",
  weekly_hours: "",
  past_attempts: "",
  timeline: "",
  budget_qualifier: "",
  notes: "",
};

export function validateStep1(d: FormData): Partial<Record<keyof FormData, string>> {
  const errors: Partial<Record<keyof FormData, string>> = {};
  const n = validateFullName(d.full_name); if (n) errors.full_name = n;
  const e = validateEmail(d.email); if (e) errors.email = e;
  const p = validatePhone(d.phone); if (p) errors.phone = p;
  return errors;
}

export function validateStep2(d: FormData): Partial<Record<keyof FormData, string>> {
  const errors: Partial<Record<keyof FormData, string>> = {};
  if (!d.age_bracket) errors.age_bracket = "Please select your age bracket.";
  if (!d.primary_goal) errors.primary_goal = "Please select a goal.";
  if (!d.weekly_hours) errors.weekly_hours = "Please select your weekly hours.";
  return errors;
}

export function validateStep3(d: FormData): Partial<Record<keyof FormData, string>> {
  const errors: Partial<Record<keyof FormData, string>> = {};
  const pa = validateMinLength(d.past_attempts, 30, "This answer");
  if (pa) errors.past_attempts = pa;
  const paMax = validateMaxLength(d.past_attempts, 2000, "This answer");
  if (paMax) errors.past_attempts = paMax;
  if (!d.timeline) errors.timeline = "Please select a timeline.";
  if (!d.budget_qualifier) errors.budget_qualifier = "Please answer this question.";
  const nMax = validateMaxLength(d.notes, 2000, "Notes");
  if (nMax) errors.notes = nMax;
  return errors;
}
