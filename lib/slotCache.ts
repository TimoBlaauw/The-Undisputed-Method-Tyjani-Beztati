import "server-only";
import type { NormalizedSlots } from "./ghl";

type Entry = { value: NormalizedSlots; expires: number };
const TTL_MS = 2 * 60 * 1000;

const store = new Map<string, Entry>();

export function getCached(key: string): NormalizedSlots | null {
  const e = store.get(key);
  if (!e) return null;
  if (Date.now() > e.expires) {
    store.delete(key);
    return null;
  }
  return e.value;
}

export function setCached(key: string, value: NormalizedSlots): void {
  store.set(key, { value, expires: Date.now() + TTL_MS });
}
