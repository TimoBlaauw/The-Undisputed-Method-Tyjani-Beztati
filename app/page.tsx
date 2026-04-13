import BookingModal from "@/components/BookingModal";
import ClientEffects from "@/components/ClientEffects";

export default function HomePage() {
  return (
    <>
      {/* ═══════════ NAVBAR ═══════════ */}
      <nav className="nav" id="navbar">
        <div className="nav-inner">
          <div className="nav-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-TUM-with-name.png" alt="The Undisputed Method" />
          </div>
          <div className="nav-cta">
            <a href="#" className="btn btn-primary open-booking">Apply Now</a>
          </div>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section className="hero">
        <div className="hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://glory.pinkyellow.network/assets/black-1756817032.png" alt="Tyjani Beztati" />
        </div>
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">The Exact Method of a Six-Time World Champion</span>
            <h1>
              Build an Elite Body, an Unbreakable Mindset{" "}
              <span className="gold-line">&amp; Championship Performance</span>
            </h1>
            <p className="hero-desc desktop-only">
              Stop wasting time with cookie-cutter programs that treat you like everyone else.
              This is the same proven system that built a world champion — now available to
              serious men who refuse to settle for average.
            </p>
            <p className="hero-desc mobile-only" style={{ display: "none" }}>
              Stop wasting time with cookie-cutter programs that treat you like everyone else.
              This is the same proven system that built a world champion.
            </p>
            <div className="hero-buttons desktop-only">
              <a href="#" className="btn btn-primary open-booking">Apply for Coaching</a>
              <a href="#method" className="btn btn-secondary">Learn More</a>
            </div>
          </div>
          <div className="hero-vsl">
            <div className="vsl-container open-booking">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="vsl-logo" src="/logo-TUM-with-name.png" alt="The Undisputed Method" />
              <div className="vsl-play">
                <svg viewBox="0 0 24 24"><polygon points="8,5 20,12 8,19" /></svg>
              </div>
              <span className="vsl-label">Watch the Full Breakdown</span>
            </div>
          </div>
          <div className="hero-buttons mobile-only" style={{ display: "none" }}>
            <a href="#" className="btn btn-primary open-booking">Apply for Coaching</a>
          </div>
        </div>
      </section>

      {/* ═══════════ CREDIBILITY BAR ═══════════ */}
      <div className="cred-bar">
        <div className="cred-inner">
          <div className="cred-item">
            <span className="cred-num" data-target="6" data-suffix="×">0×</span>
            <span className="cred-label">GLORY World<br />Champion</span>
          </div>
          <div className="cred-item">
            <span className="cred-num" data-target="27">0</span>
            <span className="cred-label">Professional<br />Wins</span>
          </div>
          <div className="cred-item">
            <span className="cred-num" data-target="17" data-suffix="+">0+</span>
            <span className="cred-label">Years of Elite<br />Training</span>
          </div>
          <div className="cred-item">
            <span className="cred-num" data-target="9">0</span>
            <span className="cred-label">Knockout<br />Victories</span>
          </div>
          <div className="cred-item">
            <span className="cred-num" data-target="50" data-static="50‑1‑1">0</span>
            <span className="cred-label">Amateur<br />Record</span>
          </div>
        </div>
      </div>

      {/* ═══════════ TESTIMONIAL 1 ═══════════ */}
      <div className="testimonial-strip reveal">
        <div className="testimonial-inner">
          <p className="testimonial-quote">
            &ldquo;I went from feeling soft and undisciplined to having the body and mindset of a
            warrior. Tyjani&apos;s method doesn&apos;t just change your physique — it transforms
            who you are as a man.&rdquo;
          </p>
          <p className="testimonial-author">— Marcus R., Entrepreneur</p>
        </div>
      </div>

      {/* ═══════════ PROBLEMS ═══════════ */}
      <section className="problems-section">
        <div className="problems-header reveal">
          <span className="eyebrow">Sound Familiar?</span>
          <h2>The 3 Traps Keeping You <span className="gold">Stuck</span></h2>
          <div className="divider" />
        </div>
        <div className="problems-grid">
          <div className="problem-card reveal reveal-delay-1">
            <div className="problem-num">01</div>
            <h3>You&apos;re Tired of Carrying Excess Body Fat That Makes You Feel Weak</h3>
            <p>Every morning you look in the mirror and see a man who&apos;s let himself go. The gut, the soft arms, the face that&apos;s lost its edge.</p>
            <p>Every generic program treats you like just another number. Cookie-cutter workouts. Meal plans designed for soccer moms. Zero accountability.</p>
          </div>
          <div className="problem-card reveal reveal-delay-2">
            <div className="problem-num">02</div>
            <h3>You Lack the Structure and Discipline to Stay Consistent</h3>
            <p>You start strong but always fade. Monday you&apos;re motivated. By Friday you&apos;re making excuses. You can&apos;t stick with anything long enough.</p>
            <p>You&apos;ve never had a real system. You&apos;ve never had someone who actually performs at the highest level holding you accountable.</p>
          </div>
          <div className="problem-card reveal reveal-delay-3">
            <div className="problem-num">03</div>
            <h3>You&apos;re Frustrated With Programs That Promise Everything but Deliver Nothing</h3>
            <p>Another &ldquo;transformation guru&rdquo; with fake photos. Another &ldquo;revolutionary method&rdquo; that&apos;s just repackaged basics. Programs that vanish when you need support.</p>
            <p>You want to learn from someone who&apos;s actually done it — not someone who just talks about it.</p>
          </div>
        </div>
      </section>

      {/* ═══════════ SOLUTION ═══════════ */}
      <section className="solution reveal" id="method">
        <div className="solution-grid">
          <div className="solution-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://api.beyondkick.com/uploads/large_Tyjani_Beztati_46b577b9e5.webp" alt="Tyjani Beztati" />
          </div>
          <div className="solution-copy">
            <span className="eyebrow">The Solution</span>
            <h2>
              The Undisputed Method:{" "}
              <span className="gold-line">The Only System Built by a Real World Champion</span>
            </h2>
            <p>This isn&apos;t another fitness program created by some Instagram influencer. This is the exact method used by Tyjani Beztati — six-time GLORY Lightweight World Champion — to build and maintain elite performance.</p>
            <p>While other coaches are selling you theory, Tyjani is giving you the real system tested at the highest levels of competition. The same principles that built a world champion are now available to serious men who want real results.</p>
            <a href="#" className="btn btn-primary open-booking" style={{ marginTop: 8 }}>Apply for Coaching</a>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="steps">
        <div className="text-center reveal">
          <span className="eyebrow">The Process</span>
          <h2>How The Undisputed Method Works</h2>
          <div className="divider" />
        </div>
        <div className="steps-grid">
          <div className="step-card reveal reveal-delay-1">
            <div className="step-num">01</div>
            <h3>Assessment &amp; Customization</h3>
            <p>We analyze your current state, goals, and lifestyle to create a completely personalized plan. Everything is built specifically for you.</p>
          </div>
          <div className="step-card reveal reveal-delay-2">
            <div className="step-num">02</div>
            <h3>Implementation &amp; Execution</h3>
            <p>You follow your custom training program, personalized nutrition plan, and recovery protocols with direct support through the exclusive app.</p>
          </div>
          <div className="step-card reveal reveal-delay-3">
            <div className="step-num">03</div>
            <h3>Weekly Optimization &amp; Accountability</h3>
            <p>Every week, Tyjani personally reviews your progress and adjusts your plan. Real coaching from a real champion invested in your success.</p>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIAL 2 ═══════════ */}
      <div className="testimonial-strip alt reveal">
        <div className="testimonial-inner">
          <p className="testimonial-quote">
            &ldquo;The difference between Tyjani&apos;s method and everything else I tried is simple — this actually works. I&apos;m in the best shape of my life at 38, and my confidence has skyrocketed.&rdquo;
          </p>
          <p className="testimonial-author">— David K., Sales Executive</p>
        </div>
      </div>

      {/* ═══════════ WHAT YOU GET ═══════════ */}
      <section className="features">
        <div className="text-center reveal">
          <span className="eyebrow">Everything Included</span>
          <h2>What You Get When You Join <span className="gold">The Undisputed Method</span></h2>
          <div className="divider" />
        </div>
        <div className="features-grid">
          <div className="feature-card reveal reveal-delay-1">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg></div>
            <div className="feature-text">
              <h4>Custom Training Programs</h4>
              <p>Workouts designed for your body, goals, and schedule — not a one-size-fits-all template.</p>
            </div>
          </div>
          <div className="feature-card reveal reveal-delay-2">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><path d="M12 2a5 5 0 0 1 5 5c0 2.76-2.24 5-5 5s-5-2.24-5-5a5 5 0 0 1 5-5z" /><path d="M3 20c0-3 4-5 9-5s9 2 9 5v1H3v-1z" /></svg></div>
            <div className="feature-text">
              <h4>Personalized Nutrition Plans</h4>
              <p>Meal strategies that fit your lifestyle while maximizing fat loss, muscle gain, and energy.</p>
            </div>
          </div>
          <div className="feature-card reveal reveal-delay-1">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><path d="M4.93 4.93a10 10 0 0 1 14.14 0M7.76 7.76a6 6 0 0 1 8.48 0" /><circle cx="12" cy="12" r="2" /><path d="M12 14v8" /></svg></div>
            <div className="feature-text">
              <h4>Recovery Optimization</h4>
              <p>The same recovery protocols used by professional fighters to keep you performing at your peak.</p>
            </div>
          </div>
          <div className="feature-card reveal reveal-delay-2">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg></div>
            <div className="feature-text">
              <h4>Weekly Personal Check-Ins</h4>
              <p>Direct access to Tyjani for guidance, adjustments, and accountability every single week.</p>
            </div>
          </div>
          <div className="feature-card reveal reveal-delay-1">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg></div>
            <div className="feature-text">
              <h4>Exclusive Training App</h4>
              <p>Everything in one place — workouts, nutrition, progress tracking — accessible anywhere.</p>
            </div>
          </div>
          <div className="feature-card reveal reveal-delay-2">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="5" /><path d="M12 13l-4 7h8l-4-7z" /></svg></div>
            <div className="feature-text">
              <h4>1:1 Coaching Support</h4>
              <p>Real coaching from a real champion. Not a chatbot. Not a group thread. Direct, personal guidance.</p>
            </div>
          </div>
          <div className="feature-card reveal reveal-delay-1">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M12 6v6l4 2" stroke="var(--dark-card)" fill="none" strokeWidth="2" /></svg></div>
            <div className="feature-text">
              <h4>Elite Mindset Development</h4>
              <p>Build the mental toughness that separates champions from everyone else — in and out of the gym.</p>
            </div>
          </div>
          <div className="feature-card reveal reveal-delay-2">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></div>
            <div className="feature-text">
              <h4>Brotherhood Community</h4>
              <p>Connect with other serious men on the same journey. Iron sharpens iron.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIAL 3 ═══════════ */}
      <div className="testimonial-strip reveal">
        <div className="testimonial-inner">
          <p className="testimonial-quote">
            &ldquo;I&apos;ve worked with other coaches before, but none of them had actually achieved what I wanted to achieve. Tyjani has been where I want to go — that makes all the difference.&rdquo;
          </p>
          <p className="testimonial-author">— James T., Business Owner</p>
        </div>
      </div>

      {/* ═══════════ EXCLUSIVE FEATURES ═══════════ */}
      <section className="exclusive">
        <div className="text-center reveal">
          <span className="eyebrow">The Edge</span>
          <h2>Exclusive Features You Won&apos;t Find <span className="gold">Anywhere Else</span></h2>
          <div className="divider" />
        </div>
        <div className="exclusive-grid">
          <div className="excl-card reveal reveal-delay-1">
            <span className="excl-badge">Mindset</span>
            <h3>Champion&apos;s Mindset Training</h3>
            <p>Learn the exact mental strategies Tyjani used to become a six-time world champion. Proven psychological techniques for peak performance.</p>
          </div>
          <div className="excl-card reveal reveal-delay-2">
            <span className="excl-badge">Recovery</span>
            <h3>Fighter&apos;s Recovery System</h3>
            <p>Access the same recovery protocols used by professional fighters. Most programs ignore recovery — we make it a cornerstone.</p>
          </div>
          <div className="excl-card reveal reveal-delay-3">
            <span className="excl-badge">Access</span>
            <h3>Direct Champion Access</h3>
            <p>You&apos;re not getting coached by some random trainer. You&apos;re getting direct access to a six-time world champion who&apos;s actually lived this method.</p>
          </div>
          <div className="excl-card reveal reveal-delay-4">
            <span className="excl-badge">Adaptive</span>
            <h3>Real-Time Plan Adjustments</h3>
            <p>Your plan evolves as you do. Tyjani personally reviews and adjusts your program weekly based on your progress.</p>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIAL 4 ═══════════ */}
      <div className="testimonial-strip alt reveal">
        <div className="testimonial-inner">
          <p className="testimonial-quote">
            &ldquo;The mindset training alone was worth the investment. I&apos;m not just stronger physically — I&apos;m mentally tougher in every area of my life.&rdquo;
          </p>
          <p className="testimonial-author">— Ryan M., Attorney</p>
        </div>
      </div>

      {/* ═══════════ AUTHORITY ═══════════ */}
      <section className="authority">
        <div className="authority-grid">
          <div className="authority-img reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/tyjani-wonderboy.jpg" alt="Tyjani Beztati" />
          </div>
          <div className="authority-copy reveal reveal-delay-1">
            <span className="eyebrow">Your Coach</span>
            <h2>Tyjani <span className="gold">&ldquo;The Wonderboy&rdquo;</span> Beztati</h2>
            <p>Born and raised in East Amsterdam with Moroccan and Surinamese heritage, Tyjani began training at age 10 and signed with GLORY at 18 — the youngest fighter in the organization&apos;s history.</p>
            <p>He claimed the GLORY Lightweight Championship in 2021 and defended it five times, cementing his legacy as a six-time world champion with 27 professional wins.</p>
            <p>Beyond the ring, Tyjani is an entrepreneur, gym owner, and mentor who&apos;s now channeled 17+ years of elite-level discipline into The Undisputed Method.</p>
            <div className="authority-stats">
              <div className="stat-box"><div className="stat-num">6×</div><div className="stat-label">World Champion</div></div>
              <div className="stat-box"><div className="stat-num">27-4</div><div className="stat-label">Pro Record</div></div>
              <div className="stat-box"><div className="stat-num">17+</div><div className="stat-label">Years Training</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="faq" id="faq">
        <div className="text-center reveal">
          <span className="eyebrow">FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <div className="divider" />
        </div>
        <div className="faq-list">
          {[
            {
              q: "How is this different from other fitness programs?",
              a: "Most programs are created by people who've never achieved what you want to achieve. Tyjani is a six-time world champion who's actually lived this method.",
            },
            {
              q: "Do I need to be in shape to start?",
              a: "No. The program is completely customized to your current fitness level. Whether you're a beginner or experienced athlete, the plan meets you where you are.",
            },
            {
              q: "How much time do I need to commit?",
              a: "Most clients train 4–5 times per week for 45–60 minutes. The program fits into your busy schedule. Consistency over perfection.",
            },
            {
              q: "What if I don't see results?",
              a: "If you follow the program and don't see significant improvements in body composition, strength, and mindset within 90 days, we'll work with you until you do.",
            },
            {
              q: "Is this just for athletes?",
              a: "No. Most clients are business professionals, entrepreneurs, and fathers. The method is for any serious man who wants to build an elite body and mindset.",
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
      <section className="final-cta" id="apply">
        <div className="final-cta-inner reveal">
          <span className="urgency-badge">Only 3 Spots Remaining in This Launch</span>
          <h2>Ready to Stop Making Excuses and <span className="gold">Start Getting Results?</span></h2>
          <p>This isn&apos;t for everyone. The Undisputed Method is designed for serious men who are ready to do the work. But if you&apos;re ready to follow a proven system created by a real champion — then it&apos;s time to apply.</p>
          <div className="cta-buttons">
            <a href="#" className="btn btn-red open-booking" style={{ fontSize: 16, padding: "18px 44px" }}>
              Secure Your Spot Now
            </a>
          </div>
          <p className="final-note">Champions aren&apos;t made by accident. They&apos;re made by following proven methods and refusing to accept anything less than excellence. The choice is yours — stay where you are, or become the man you&apos;re meant to be.</p>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="footer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="footer-logo" src="/logo-TUM-with-name.png" alt="The Undisputed Method" />
        <p>&copy; 2026 The Undisputed Method — Tyjani Beztati. All rights reserved.</p>
      </footer>

      {/* Booking modal + scroll/reveal/counter/FAQ wiring */}
      <BookingModal />
      <ClientEffects />
    </>
  );
}
