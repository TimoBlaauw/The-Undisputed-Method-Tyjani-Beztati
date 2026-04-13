"use client";

import Calendar, { type Slot } from "@/components/Calendar";

type Props = {
  timezone: string;
  selected: Slot | null;
  onSelect: (slot: Slot | null) => void;
};

export default function Step4Calendar({ timezone, selected, onSelect }: Props) {
  return (
    <>
      <h3>Pick a time</h3>
      <p className="modal-sub">Choose a slot for your strategy call with Tyjani.</p>
      <Calendar timezone={timezone} selected={selected} onSelect={onSelect} />
    </>
  );
}
