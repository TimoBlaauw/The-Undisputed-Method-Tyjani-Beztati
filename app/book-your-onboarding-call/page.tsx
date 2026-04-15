import type { Metadata } from "next";
import BookOnboarding from "@/components/BookOnboarding";

export const metadata: Metadata = {
  title: "Book Your Onboarding Call — The Undisputed Method",
  description: "Schedule your onboarding call with Tyjani Beztati.",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function pickParam(v: string | string[] | undefined): string {
  if (Array.isArray(v)) return (v[0] || "").trim();
  return (v || "").trim();
}

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default async function BookOnboardingPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const email = pickParam(params.email);
  const firstName = pickParam(params.first_name);
  const lastName = pickParam(params.last_name);

  const gated = !email || !isValidEmail(email) || !firstName;

  return (
    <>
      <nav className="nav" id="navbar">
        <div className="nav-inner">
          <div className="nav-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-TUM-with-name.png" alt="The Undisputed Method" />
          </div>
        </div>
      </nav>

      <section
        className="final-cta"
        style={{ minHeight: "calc(100vh - 200px)", paddingTop: 120 }}
      >
        <div className="final-cta-inner" style={{ maxWidth: 960 }}>
          <span className="eyebrow">Onboarding</span>
          <h2>
            Book Your <span className="gold">Onboarding Call</span>
          </h2>
          <div className="divider" />

          {gated ? (
            <div
              style={{
                marginTop: 32,
                padding: "32px 28px",
                border: "1px solid rgba(201, 162, 39, 0.3)",
                borderRadius: 12,
                background: "rgba(0, 0, 0, 0.4)",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: 12 }}>Access Denied</h3>
              <p style={{ margin: 0, opacity: 0.85 }}>
                Please use the personal link from your welcome email to schedule
                your onboarding call. If you can&apos;t find it, reply to that
                email and we&apos;ll resend it.
              </p>
            </div>
          ) : (
            <div style={{ marginTop: 32 }}>
              <BookOnboarding
                email={email}
                firstName={firstName}
                lastName={lastName}
              />
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="footer-logo" src="/logo-TUM-with-name.png" alt="The Undisputed Method" />
        <p>&copy; 2026 The Undisputed Method — Tyjani Beztati. All rights reserved.</p>
      </footer>
    </>
  );
}
