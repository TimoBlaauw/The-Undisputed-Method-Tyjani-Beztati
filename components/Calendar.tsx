"use client";

import { useEffect, useMemo, useState } from "react";

export type Slot = { startTime: string; endTime: string };
type SlotsByDate = { date: string; slots: Slot[] }[];

type Props = {
  timezone: string;
  selected: Slot | null;
  onSelect: (slot: Slot | null) => void;
  slotsEndpoint?: string;
};

const DOW = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
}
function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function Calendar({ timezone, selected, onSelect, slotsEndpoint = "/api/calendar/slots" }: Props) {
  const [cursor, setCursor] = useState<Date>(() => startOfMonth(new Date()));
  const [slotsByDate, setSlotsByDate] = useState<SlotsByDate>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeDate, setActiveDate] = useState<string | null>(null);

  // Fetch slots whenever the visible month changes.
  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    const start = startOfMonth(cursor).getTime();
    const end = endOfMonth(cursor).getTime();
    const url = `${slotsEndpoint}?startDate=${start}&endDate=${end}&timezone=${encodeURIComponent(timezone)}`;

    fetch(url, { signal: ctrl.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error("Failed to load");
        return r.json() as Promise<{ slots: SlotsByDate }>;
      })
      .then((data) => {
        setSlotsByDate(data.slots ?? []);
        setLoading(false);
      })
      .catch((e: unknown) => {
        if ((e as { name?: string })?.name === "AbortError") return;
        setError("Couldn't load the calendar. Please refresh and try again.");
        setLoading(false);
      });

    return () => ctrl.abort();
  }, [cursor, timezone, slotsEndpoint]);

  const availableDates = useMemo(() => new Set(slotsByDate.map((s) => s.date)), [slotsByDate]);
  const slotsForActive = useMemo(() => {
    if (!activeDate) return [];
    return slotsByDate.find((s) => s.date === activeDate)?.slots ?? [];
  }, [slotsByDate, activeDate]);

  // Auto-select the first available date when slots load.
  useEffect(() => {
    if (slotsByDate.length === 0) {
      setActiveDate(null);
      return;
    }
    if (!activeDate || !availableDates.has(activeDate)) {
      setActiveDate(slotsByDate[0].date);
    }
  }, [slotsByDate, availableDates, activeDate]);

  // Build the month grid.
  const grid: (Date | null)[] = useMemo(() => {
    const first = startOfMonth(cursor);
    const last = endOfMonth(cursor);
    // Mon=0..Sun=6
    const startDow = (first.getDay() + 6) % 7;
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startDow; i++) cells.push(null);
    for (let d = 1; d <= last.getDate(); d++) {
      cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    }
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [cursor]);

  const today = new Date();
  const minMonth = startOfMonth(today);
  const canPrev = cursor > minMonth;

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: timezone,
    }).format(d);
  };

  if (error) {
    return <div className="calendar-error">{error}</div>;
  }

  return (
    <>
      <div className="calendar-wrap">
        <div className="calendar-pane">
          <div className="cal-header">
            <button
              type="button"
              className="cal-nav"
              onClick={() => setCursor((c) => addMonths(c, -1))}
              disabled={!canPrev}
              aria-label="Previous month"
            >‹</button>
            <span className="cal-month">{MONTHS[cursor.getMonth()]} {cursor.getFullYear()}</span>
            <button
              type="button"
              className="cal-nav"
              onClick={() => setCursor((c) => addMonths(c, 1))}
              aria-label="Next month"
            >›</button>
          </div>
          <div className="cal-grid">
            {DOW.map((d) => <div key={d} className="cal-dow">{d}</div>)}
            {grid.map((d, i) => {
              if (!d) return <div key={`e${i}`} className="cal-day empty" />;
              const key = ymd(d);
              const available = availableDates.has(key);
              const isSelected = activeDate === key;
              return (
                <button
                  key={key}
                  type="button"
                  className={`cal-day${available ? " available" : ""}${isSelected ? " selected" : ""}`}
                  disabled={!available}
                  onClick={() => {
                    setActiveDate(key);
                    onSelect(null);
                  }}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="calendar-pane slots-pane">
          <h4>Available times</h4>
          {loading ? (
            <div className="calendar-loading">
              <span className="calendar-spinner" />
              Loading available times…
            </div>
          ) : slotsByDate.length === 0 ? (
            <p className="slots-empty">No availability this month. Try next month →</p>
          ) : slotsForActive.length === 0 ? (
            <p className="slots-empty">Pick a date to see available times.</p>
          ) : (
            <div className="slots-list">
              {slotsForActive.map((slot) => {
                const isSel = selected?.startTime === slot.startTime;
                return (
                  <button
                    key={slot.startTime}
                    type="button"
                    className={`slot-btn${isSel ? " selected" : ""}`}
                    onClick={() => onSelect(slot)}
                  >
                    {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <p className="calendar-tz">All times in {timezone}</p>
    </>
  );
}
