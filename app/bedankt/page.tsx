import ClientEffects from "@/components/ClientEffects";

export const metadata = {
  title: "You're Booked — The Undisputed Method",
  description: "Your strategy call with Tyjani is confirmed. Add it to your calendar and watch the quick video before the call.",
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  return (
    <>
      {/* ═══════════ NAV ═══════════ */}
      <nav className="nav" id="navbar">
        <div className="nav-inner">
          <div className="nav-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-TUM-with-name.png" alt="The Undisputed Method" />
          </div>
          <div className="nav-cta">
            <span className="confirmed-chip">
              <span className="dot" /> Call Confirmed
            </span>
          </div>
        </div>
      </nav>

      {/* ═══════════ HERO — Calendar CTA ═══════════ */}
      <section className="conf-hero">
        <div className="conf-hero-inner reveal">
          <span className="eyebrow">⚠ Important Last Step</span>
          <h1>
            Add The Event To Your Calendar{" "}
            <span className="gold-line">&amp; Watch The Quick Video Below</span>
          </h1>
          <p className="conf-hero-desc">
            Your call with Tyjani is booked — but it&apos;s not locked in until you accept
            the Google Calendar invite we just sent to your inbox. Do this now, before
            you do anything else.
          </p>
          <div className="conf-hero-buttons">
            <a href="#email-inbox" className="btn btn-primary" style={{ fontSize: 15, padding: "18px 40px" }}>
              Accept Google Invitation
            </a>
          </div>
          <p className="conf-hero-note">
            Check your inbox for an email from{" "}
            <span className="gold">@theundisputedmethod.com</span>
          </p>
        </div>
      </section>

      {/* ═══════════ VIDEO ═══════════ */}
      <section className="conf-video-section">
        <div className="text-center reveal">
          <span className="eyebrow">Do Not Skip This</span>
          <h2>
            Watch This Quick Video <span className="gold">Before Our Call</span>
          </h2>
          <div className="divider" />
          <p className="conf-lead">
            After adding the event to your calendar, watch this short video so we can
            hit the ground running on your call.
          </p>
        </div>

        {/* Vimeo embed placeholder — swap for real <iframe> when ready */}
        <div className="conf-video reveal">
          <div className="conf-video-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="vsl-logo" src="/logo-TUM-with-name.png" alt="The Undisputed Method" />
            <div className="vsl-play">
              <svg viewBox="0 0 24 24"><polygon points="8,5 20,12 8,19" /></svg>
            </div>
            <span className="vsl-label">Vimeo Embed — Placeholder</span>
          </div>
        </div>
      </section>

      {/* ═══════════ EMAIL INSTRUCTIONS ═══════════ */}
      <section className="conf-instructions">
        <div className="conf-instructions-grid">
          <div className="conf-screenshot reveal">
            <div className="conf-screenshot-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <span>Screenshot Placeholder — email invite example</span>
            </div>
          </div>
          <div className="conf-instructions-copy reveal reveal-delay-1">
            <span className="eyebrow">How To Accept</span>
            <h2>
              Open Your Email And Click{" "}
              <span className="gold-line">&ldquo;I Know This Sender&rdquo;</span>
            </h2>
            <p>
              To add the event to your calendar, go to your email and open the
              invitation from an <strong className="gold">unknown sender</strong> from a{" "}
              <strong className="gold">@theundisputedmethod.com</strong> domain.
            </p>
            <p>
              Then click the{" "}
              <strong className="gold">&ldquo;I Know This Sender&rdquo;</strong>{" "}
              button so your email client trusts the invite and Google Calendar
              actually adds the event to your schedule.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ WHAT TO EXPECT — step-card style ═══════════ */}
      <section className="steps">
        <div className="text-center reveal">
          <span className="eyebrow">On The Call</span>
          <h2>
            What Will Your Call <span className="gold">Be Like?</span>
          </h2>
          <div className="divider" />
        </div>
        <div className="steps-grid conf-steps-grid">
          <div className="step-card reveal reveal-delay-1">
            <div className="step-num">01</div>
            <h3>Direct With Tyjani</h3>
            <p>You&apos;ll speak directly with Tyjani himself — no sales reps, no assistants, no hand-offs. Just the man running the method.</p>
          </div>
          <div className="step-card reveal reveal-delay-2">
            <div className="step-num">02</div>
            <h3>30 Minutes Of Depth</h3>
            <p>The call is 30 minutes long — we can go slightly over if needed, so don&apos;t stack back-to-back meetings right after.</p>
          </div>
          <div className="step-card reveal reveal-delay-3">
            <div className="step-num">03</div>
            <h3>Deep Assessment Review</h3>
            <p>We&apos;ll dive into your answers from the application so we understand your exact situation — not some generic cookie-cutter version of it.</p>
          </div>
          <div className="step-card reveal reveal-delay-1">
            <div className="step-num">04</div>
            <h3>Real Diagnosis</h3>
            <p>You&apos;ll get clarity on what&apos;s actually holding you back and what needs to change to finally make real progress stick.</p>
          </div>
          <div className="step-card reveal reveal-delay-2">
            <div className="step-num">05</div>
            <h3>Your Transformation Path</h3>
            <p>You&apos;ll leave with a clear picture of what your transformation path looks like — step by step, week by week, from where you are now to where you want to be.</p>
          </div>
          <div className="step-card reveal reveal-delay-3">
            <div className="step-num">06</div>
            <h3>Zero Pressure</h3>
            <p>Whether we work together or not, you&apos;ll walk away with real value from this call. We want you in or out — both are fine.</p>
          </div>
        </div>
      </section>

      {/* ═══════════ CREDIBILITY — stat-box style ═══════════ */}
      <section className="conf-credibility">
        <div className="text-center reveal">
          <span className="eyebrow">The Receipts</span>
          <h2>
            Do We Actually Know <span className="gold">What We&apos;re Doing?</span>
          </h2>
          <div className="divider" />
          <p className="conf-lead">
            Fair question. Here&apos;s the short answer, in numbers you can verify on the call.
          </p>
        </div>

        <div className="conf-stats reveal reveal-delay-1">
          <div className="conf-stat-box">
            <div className="stat-num">[X]+</div>
            <div className="stat-label">Clients Coached<br />To Transformation</div>
          </div>
          <div className="conf-stat-box">
            <div className="stat-num">[X,000]kg</div>
            <div className="stat-label">Body Fat Lost<br />Across Clients</div>
          </div>
          <div className="conf-stat-box">
            <div className="stat-num">2–4</div>
            <div className="stat-label">Weeks To First<br />Visible Results</div>
          </div>
          <div className="conf-stat-box">
            <div className="stat-num">17+</div>
            <div className="stat-label">Years Of Elite<br />Training Experience</div>
          </div>
        </div>

        <div className="conf-cred-notes reveal reveal-delay-2">
          <p>
            <span className="gold">→</span> We specialize in <strong>sustainable</strong>{" "}
            transformations — no crash diets, no extreme restrictions, no rebounds.
          </p>
          <p>
            <span className="gold">→</span> Tyjani has personally coached high-performing
            men — fathers, founders, executives — through complete body transformations.
          </p>
          <p>
            <span className="gold">→</span> Our clients stay consistent because the method
            is built <strong>around their lifestyle</strong>, not against it.
          </p>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      {/* These will eventually be replaced with video testimonials once available */}
      <section className="conf-testimonials">
        <div className="text-center reveal">
          <span className="eyebrow">Real Clients, Real Results</span>
          <h2>
            Don&apos;t Just Take <span className="gold">Our Word For It</span>
          </h2>
          <div className="divider" />
        </div>
        <div className="conf-testimonials-grid">
          {[
            { q: "I'd tried every diet and every program out there. Tyjani was the first person who actually looked at my life and built something I could stick to. The weight came off without me hating every meal.", n: "[Client Name]", r: "Lost [X] kg in [Y] weeks", d: 1 },
            { q: "I'm a father, I run a business, I travel half the month. I thought getting in shape wasn't realistic anymore. Three months in I'm leaner than I was at 25 and my energy is on another planet.", n: "[Client Name]", r: "Lost [X] kg in [Y] weeks", d: 2 },
            { q: "Biggest difference vs every coach I've worked with before — Tyjani doesn't just hand you a plan and disappear. He's in it with you. That's why it finally worked for me.", n: "[Client Name]", r: "Lost [X] kg + gained muscle", d: 3 },
            { q: "I didn't just lose fat — I learned how my body actually works. I will never be out of shape again because I understand the game now. That's the part no one else teaches.", n: "[Client Name]", r: "Lost [X] kg, kept it off", d: 1 },
            { q: "I walked into the first call expecting a hard pitch. Instead Tyjani spent 30 minutes actually diagnosing what I had been doing wrong for years. By the end I wanted in — not because I was sold, but because I finally understood.", n: "[Client Name]", r: "Body recomp in [Y] months", d: 2 },
            { q: "The discipline piece is what changed me. The fat loss followed automatically. I'm a different man than I was six months ago — and I mean that.", n: "[Client Name]", r: "Full transformation in [Y] months", d: 3 },
          ].map((t, i) => (
            <div key={i} className={`conf-testimonial reveal reveal-delay-${t.d}`}>
              <div className="conf-testimonial-mark">&ldquo;</div>
              <p className="conf-testimonial-quote">{t.q}</p>
              <div className="conf-testimonial-author">
                <div className="conf-testimonial-avatar">TUM</div>
                <div>
                  <div className="conf-testimonial-name">{t.n}</div>
                  <div className="conf-testimonial-result">{t.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      {/* These will be replaced with short video answers once we have recordings from sales call insights */}
      <section className="faq">
        <div className="text-center reveal">
          <span className="eyebrow">Your Questions, Answered</span>
          <h2>Common Questions Before The Call</h2>
          <div className="divider" />
        </div>
        <div className="faq-list">
          {[
            {
              q: "What if I've tried everything and nothing works?",
              a: "You're in the right place. Almost every client we take on has tried multiple diets, coaches, and programs before us. The reason 'nothing works' is almost never effort — it's that the plan was built for someone else's life. Our method is reverse-engineered from your actual schedule, food preferences, and starting point, which is why it sticks when the others didn't.",
            },
            {
              q: "How is this different from hiring a regular personal trainer?",
              a: "A trainer sells you sessions. We sell you a transformation. A trainer counts reps; we engineer your entire lifestyle — nutrition, training, recovery, mindset, accountability — around a specific outcome with a specific deadline. That's a fundamentally different product, which is why the results are fundamentally different.",
            },
            {
              q: "What if I have a busy schedule?",
              a: "Most of our clients are fathers, business owners, executives, or shift workers. Busy is the norm, not the exception. The method is designed to work in 3–5 hours per week total — including training. If you can find time for Netflix, you can find time for this.",
            },
            {
              q: "Do I need a gym membership to do this?",
              a: "No. We have clients who train at home with minimal equipment and get the same results as clients who train at a full commercial gym. On your call, we'll ask what you have access to and build the plan around that — not the other way around.",
            },
            {
              q: "What kind of results can I realistically expect?",
              a: "Visible change in the first 2–4 weeks if you follow the plan. Significant body composition change in 8–12 weeks. A full transformation in 4–6 months for most starting points. These aren't promises — they're the pattern we see when clients do the work. On your call, Tyjani will give you a realistic forecast based on your exact starting point.",
            },
            {
              q: "What happens after the call?",
              a: "One of two things. Either we're a fit and Tyjani walks you through exactly how the program works, what the investment is, and how to get started — or we're not a fit, and you walk away with a clear picture of what you should do next regardless. No high-pressure pitch. No 'limited time' nonsense. You'll know by the end of the call whether this is your move or not.",
            },
          ].map((item) => (
            <div key={item.q} className="faq-item reveal">
              <button className="faq-q" type="button">
                {item.q}
                <svg className="faq-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className="faq-a">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="final-cta">
        <div className="final-cta-inner reveal">
          <span className="urgency-badge">Don&apos;t Miss Your Call</span>
          <h2>
            Add Your Call To Your Calendar{" "}
            <span className="gold">Now So You Don&apos;t Miss It</span>
          </h2>
          <p>
            The people who show up prepared are the ones who walk away with a real
            transformation. Take 30 seconds now to accept the invite — future you will
            thank you.
          </p>
          <div className="cta-buttons">
            <a href="#email-inbox" className="btn btn-primary" style={{ fontSize: 15, padding: "18px 44px" }}>
              Accept Google Invitation
            </a>
          </div>
          <p className="final-note">
            See you on the call.
            <br />
            <span className="gold" style={{ fontStyle: "normal", letterSpacing: "1px", textTransform: "uppercase" }}>
              — Tyjani
            </span>
          </p>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="footer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="footer-logo" src="/logo-TUM-with-name.png" alt="The Undisputed Method" />
        <p>&copy; 2026 The Undisputed Method — Tyjani Beztati. All rights reserved.</p>
      </footer>

      {/* Page-scoped styles — match landing-page tokens exactly */}
      <style>{`
        /* Confirmed chip in nav */
        .confirmed-chip{
          display:inline-flex;align-items:center;gap:8px;
          font-family:var(--font-oswald),'Oswald',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;
          color:var(--gold);background:rgba(200,168,78,.06);
          border:1px solid rgba(200,168,78,.25);
          padding:8px 16px;border-radius:var(--radius);
        }
        .confirmed-chip .dot{
          width:7px;height:7px;border-radius:50%;background:#2ecc71;
          box-shadow:0 0 0 0 rgba(46,204,113,.6);
          animation:confPulse 1.8s ease-in-out infinite;
        }
        @keyframes confPulse{
          0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(46,204,113,.6)}
          50%{opacity:.6;box-shadow:0 0 0 6px rgba(46,204,113,0)}
        }

        /* Hero */
        .conf-hero{
          padding:140px 24px 70px;background:var(--black);position:relative;
          border-bottom:1px solid var(--dark-border);
          overflow:hidden;
        }
        .conf-hero::before{
          content:'';position:absolute;top:0;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,var(--gold),transparent);
        }
        .conf-hero::after{
          content:'';position:absolute;inset:0;pointer-events:none;
          background:radial-gradient(ellipse at 50% 20%,rgba(200,168,78,.06) 0%,transparent 55%);
        }
        .conf-hero-inner{
          position:relative;max-width:820px;margin:0 auto;text-align:center;
        }
        .conf-hero-inner h1{
          margin-bottom:20px;font-size:clamp(28px,4.6vw,52px);
        }
        .conf-hero-inner h1 .gold-line{color:var(--gold);display:block}
        .conf-hero-desc{
          font-size:16px;color:var(--gray);line-height:1.8;
          max-width:640px;margin:0 auto 32px;
        }
        .conf-hero-buttons{display:flex;justify-content:center;margin-bottom:18px}
        .conf-hero-note{
          font-size:12px;color:var(--gray);letter-spacing:.5px;
        }

        /* Video section */
        .conf-video-section{
          padding:80px 24px;background:var(--dark);
          border-bottom:1px solid var(--dark-border);
        }
        .conf-lead{
          font-size:15px;color:var(--gray);line-height:1.8;
          max-width:620px;margin:0 auto;
        }
        .conf-video{max-width:820px;margin:48px auto 0}
        .conf-video-inner{
          position:relative;width:100%;aspect-ratio:16/9;
          background:#0D0D0D;border:1px solid rgba(255,255,255,.06);
          border-radius:var(--radius-lg);overflow:hidden;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          transition:border-color .3s,box-shadow .3s;
        }
        .conf-video-inner:hover{
          border-color:rgba(200,168,78,.25);
          box-shadow:0 8px 40px rgba(200,168,78,.08);
        }
        .conf-video-inner .vsl-play{
          width:88px;height:88px;
          animation:confPlayPulse 2.2s ease-in-out infinite;
        }
        .conf-video-inner .vsl-play svg{width:30px;height:30px}
        .conf-video-inner:hover .vsl-play{
          transform:scale(1.06);
          animation-play-state:paused;
        }
        @keyframes confPlayPulse{
          0%,100%{
            box-shadow:
              0 0 40px rgba(200,168,78,.25),
              0 0 0 0 rgba(200,168,78,.55);
          }
          50%{
            box-shadow:
              0 0 40px rgba(200,168,78,.25),
              0 0 0 22px rgba(200,168,78,0);
          }
        }
        @media(max-width:600px){
          .conf-video-inner .vsl-play{width:68px;height:68px}
          .conf-video-inner .vsl-play svg{width:24px;height:24px}
        }

        /* Instructions */
        .conf-instructions{
          padding:90px 24px;background:var(--black);
        }
        .conf-instructions-grid{
          max-width:var(--max-w);margin:0 auto;
          display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;
        }
        .conf-screenshot-box{
          background:var(--dark-card);
          border:1.5px dashed rgba(200,168,78,.25);
          border-radius:var(--radius-lg);
          aspect-ratio:4/3;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          gap:18px;color:var(--gray);text-align:center;padding:32px;
          font-family:var(--font-oswald),'Oswald',sans-serif;
          font-size:12px;letter-spacing:1.5px;text-transform:uppercase;
        }
        .conf-screenshot-box svg{
          width:56px;height:56px;stroke:var(--gold);opacity:.4;
        }
        .conf-instructions-copy h2{margin-bottom:18px}
        .conf-instructions-copy h2 .gold-line{color:var(--gold);display:block}
        .conf-instructions-copy p{
          color:var(--gray);font-size:15px;line-height:1.8;margin-bottom:16px;
        }

        /* Differentiator for steps-grid on confirmation page — 2x3 instead of 3x1 */
        .conf-steps-grid{
          grid-template-columns:repeat(3,1fr)!important;
          max-width:var(--max-w);
        }

        /* Credibility section — stat-box style, clearly different from step-cards above */
        .conf-credibility{
          padding:90px 24px;background:var(--dark);position:relative;
        }
        .conf-credibility::before{
          content:'';position:absolute;top:0;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,var(--gold),transparent);
        }
        .conf-stats{
          max-width:var(--max-w);margin:48px auto 32px;
          display:grid;grid-template-columns:repeat(4,1fr);gap:20px;
        }
        .conf-stat-box{
          background:var(--dark-card);
          border:1px solid var(--dark-border);
          border-radius:var(--radius-lg);
          padding:36px 20px;text-align:center;
          transition:border-color .3s,transform .3s;
        }
        .conf-stat-box:hover{
          border-color:rgba(200,168,78,.25);
          transform:translateY(-3px);
        }
        .conf-stat-box .stat-num{
          font-family:var(--font-oswald),'Oswald',sans-serif;
          font-size:48px;font-weight:700;color:var(--gold);line-height:1;
          margin-bottom:12px;
        }
        .conf-stat-box .stat-label{
          font-family:var(--font-oswald),'Oswald',sans-serif;
          font-size:11px;letter-spacing:1.5px;text-transform:uppercase;
          color:var(--gray-light);line-height:1.45;
        }
        .conf-cred-notes{
          max-width:760px;margin:0 auto;
          display:flex;flex-direction:column;gap:14px;
        }
        .conf-cred-notes p{
          font-size:15px;color:var(--gray);line-height:1.75;
          padding:18px 24px;background:rgba(255,255,255,.02);
          border-left:2px solid var(--gold);border-radius:0 var(--radius) var(--radius) 0;
        }
        .conf-cred-notes strong{color:var(--light)}

        /* Testimonials */
        .conf-testimonials{
          padding:90px 24px;background:var(--black);
        }
        .conf-testimonials-grid{
          max-width:var(--max-w);margin:48px auto 0;
          display:grid;grid-template-columns:repeat(3,1fr);gap:24px;
        }
        .conf-testimonial{
          position:relative;
          background:var(--dark-card);border:1px solid var(--dark-border);
          border-radius:var(--radius-lg);padding:36px 28px;
          transition:border-color .35s,transform .35s,box-shadow .35s;
        }
        .conf-testimonial:hover{
          border-color:rgba(200,168,78,.25);
          transform:translateY(-4px);
          box-shadow:0 12px 40px rgba(0,0,0,.4);
        }
        .conf-testimonial-mark{
          position:absolute;top:8px;right:22px;
          font-family:Georgia,serif;font-size:84px;line-height:1;
          color:var(--gold);opacity:.14;
        }
        .conf-testimonial-quote{
          font-size:14.5px;color:var(--light);font-style:italic;
          line-height:1.7;margin-bottom:22px;position:relative;
        }
        .conf-testimonial-author{
          display:flex;align-items:center;gap:12px;
          padding-top:18px;border-top:1px solid var(--dark-border);
        }
        .conf-testimonial-avatar{
          width:42px;height:42px;border-radius:50%;
          background:linear-gradient(135deg,rgba(200,168,78,.15),rgba(200,168,78,.04));
          border:1px solid rgba(200,168,78,.25);
          display:flex;align-items:center;justify-content:center;
          font-family:var(--font-oswald),'Oswald',sans-serif;
          font-size:11px;letter-spacing:1px;color:var(--gold);
        }
        .conf-testimonial-name{
          font-family:var(--font-oswald),'Oswald',sans-serif;
          font-size:13px;letter-spacing:1.2px;text-transform:uppercase;
          color:var(--white);
        }
        .conf-testimonial-result{
          font-size:11px;color:var(--gold);margin-top:3px;letter-spacing:.5px;
        }

        /* Responsive */
        @media(max-width:900px){
          .conf-hero{padding:120px 18px 60px}
          .conf-instructions-grid{grid-template-columns:1fr;gap:36px}
          .conf-steps-grid{grid-template-columns:1fr!important;max-width:560px}
          .conf-stats{grid-template-columns:repeat(2,1fr)}
          .conf-testimonials-grid{grid-template-columns:1fr;max-width:560px}
        }
        @media(max-width:600px){
          .conf-hero{padding:110px 14px 50px}
          .conf-hero-desc{font-size:14px}
          .conf-video-section{padding:60px 18px}
          .conf-instructions{padding:70px 18px}
          .conf-credibility{padding:70px 18px}
          .conf-testimonials{padding:70px 18px}
          .conf-stat-box .stat-num{font-size:36px}
          .conf-hero-buttons .btn,
          .conf-hero-buttons .btn:link{width:100%}
          .conf-hero-buttons{width:100%}
        }
      `}</style>

      <ClientEffects />
    </>
  );
}
