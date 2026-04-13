"use client";

import { useEffect } from "react";

export default function ClientEffects() {
  useEffect(() => {
    // Navbar scroll background
    const nav = document.getElementById("navbar");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll reveal
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // Counting animation for credibility numbers
    let credCounted = false;
    const credBar = document.querySelector(".cred-bar");
    let credObs: IntersectionObserver | null = null;
    if (credBar) {
      credObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && !credCounted) {
              credCounted = true;
              document.querySelectorAll<HTMLElement>(".cred-num[data-target]").forEach((el) => {
                const target = parseInt(el.dataset.target || "0", 10);
                const suffix = el.dataset.suffix || "";
                const staticVal = el.dataset.static;
                const duration = 1400;
                const start = performance.now();
                function tick(now: number) {
                  const p = Math.min((now - start) / duration, 1);
                  const ease = 1 - Math.pow(1 - p, 3);
                  if (staticVal && p >= 1) el.textContent = staticVal;
                  else el.textContent = Math.round(target * ease) + suffix;
                  if (p < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
              });
            }
          });
        },
        { threshold: 0.3 },
      );
      credObs.observe(credBar);
    }

    // FAQ toggle delegation
    const onFaqClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const btn = target.closest(".faq-q") as HTMLElement | null;
      if (btn?.parentElement) btn.parentElement.classList.toggle("open");
    };
    document.addEventListener("click", onFaqClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      credObs?.disconnect();
      document.removeEventListener("click", onFaqClick);
    };
  }, []);

  return null;
}
