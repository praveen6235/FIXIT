import React from "react";
import { useNavigate } from "react-router-dom";

const SERVICES = [
  { icon: "🔧", label: "Plumbing",    path: "/services/plumbing"    },
  { icon: "⚡", label: "Electrician", path: "/services/electrician" },
  { icon: "🪚", label: "Carpenter",   path: "/services/carpenter"   },
  { icon: "🎨", label: "Painting",    path: "/services/painting"    },
  { icon: "🧹", label: "Cleaning",    path: "/services/cleaning"    },
];

const STATS = [
  { val: "500+", label: "Customers",    icon: "bi-people-fill",       color: "#06b6d4" },
  { val: "150+", label: "Experts",      icon: "bi-wrench-adjustable", color: "#8b5cf6" },
  { val: "1K+",  label: "Jobs Done",   icon: "bi-check-circle-fill", color: "#10b981" },
  { val: "4.9★", label: "Avg Rating",  icon: "bi-star-fill",         color: "#f59e0b" },
];

const WHY = [
  { icon: "bi-shield-check-fill", color:"#06b6d4", title:"Verified Pros",       desc:"Background-checked & certified professionals every time." },
  { icon: "bi-lightning-fill",    color:"#8b5cf6", title:"Instant Booking",     desc:"Book in under 60 seconds, get same-day confirmation." },
  { icon: "bi-currency-rupee",    color:"#10b981", title:"Upfront Pricing",     desc:"No hidden costs. Price locked before work begins." },
  { icon: "bi-star-fill",         color:"#f59e0b", title:"5-Star Quality",      desc:"Rated 4.9/5 across thousands of completed jobs." },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ paddingBottom: "5rem" }}>

      {/* ── HERO ── */}
      <section className="hero-bg" style={{ padding: "5rem 0 4rem", position: "relative" }}>
        {/* Glow Orbs */}
        <div className="orb orb-cyan" style={{ top: "-120px", left: "-80px", opacity: .25 }} />
        <div className="orb orb-violet" style={{ bottom: "-80px", right: "-60px", opacity: .2 }} />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="row align-items-center g-5">

            {/* LEFT */}
            <div className="col-lg-5 anim-up">
              {/* Badge */}
              <div className="hero-badge">
                <span style={{ fontSize: "1rem" }}>⚡</span>
                India's Most Trusted Home Services
              </div>

              {/* Headline */}
              <h1 style={{ fontSize: "clamp(2.1rem,5vw,3.4rem)", fontWeight: 900, lineHeight: 1.12, marginBottom: "1.1rem" }}>
                Home Services Services Services<br />
                <span className="g-text">At Your Doorstep</span>
              </h1>

              <p style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "1.8rem", maxWidth: "430px" }}>
                Book trusted plumbers, electricians, carpenters, painters & cleaners
                in minutes. Quality guaranteed, right at your home.
              </p>

              {/* Service Selector */}
              <div style={{
                background: "rgba(8,15,32,.7)", border: "1px solid rgba(255,255,255,.09)",
                borderRadius: "22px", padding: "1.6rem", backdropFilter: "blur(20px)",
              }}>
                <p style={{ color: "#64748b", fontSize: ".78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1.1rem" }}>
                  🔍 &nbsp;What are you looking for?
                </p>
                <div className="row g-2">
                  {SERVICES.map(s => (
                    <div className="col-4" key={s.label}>
                      <div className="service-card" onClick={() => navigate(s.path)} role="button" tabIndex={0}
                        onKeyDown={e => e.key === "Enter" && navigate(s.path)}>
                        <div style={{ fontSize: "1.8rem" }}>{s.icon}</div>
                        <p>{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="d-flex gap-3 mt-3 flex-wrap">
                <button className="btn btn-primary" onClick={() => navigate("/services")}
                  style={{ padding: ".65rem 1.6rem", borderRadius: "12px" }}>
                  <i className="bi bi-grid me-2" />Explore All Services
                </button>
                <button className="btn btn-outline-light" onClick={() => navigate("/register")}
                  style={{ padding: ".65rem 1.6rem", borderRadius: "12px" }}>
                  <i className="bi bi-person-plus me-2" />Sign Up Free
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-lg-7 text-center anim-up" style={{ animationDelay: ".15s" }}>
              <div style={{ position: "relative", display: "inline-block", width: "100%" }}>

                {/* Glow ring behind image */}
                <div style={{
                  position: "absolute", inset: "10px",
                  borderRadius: "24px",
                  background: "linear-gradient(135deg,rgba(6,182,212,.3),rgba(139,92,246,.3))",
                  filter: "blur(30px)", zIndex: 0,
                }} />

                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&auto=format&fit=crop&q=80"
                  alt="Home services"
                  className="anim-float"
                  style={{
                    width: "100%", maxHeight: "420px", objectFit: "cover",
                    borderRadius: "22px",
                    border: "1px solid rgba(6,182,212,.2)",
                    boxShadow: "0 24px 70px rgba(0,0,0,.6), 0 0 60px rgba(6,182,212,.15)",
                    position: "relative", zIndex: 1,
                  }}
                />

                {/* Floating badge – rating */}
                <div style={{
                  position: "absolute", bottom: "20px", left: "20px", zIndex: 10,
                  background: "rgba(4,7,18,.92)", backdropFilter: "blur(16px)",
                  border: "1px solid rgba(6,182,212,.25)", borderRadius: "16px",
                  padding: ".85rem 1.3rem",
                }}>
                  <div style={{ fontSize: "1.3rem", fontWeight: 900, background: "linear-gradient(135deg,#f59e0b,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>4.9 ★</div>
                  <div style={{ color: "#64748b", fontSize: ".75rem", marginTop: ".1rem" }}>500+ Reviews</div>
                </div>

                {/* Floating badge – verified */}
                <div style={{
                  position: "absolute", top: "20px", right: "20px", zIndex: 10,
                  background: "rgba(4,7,18,.92)", backdropFilter: "blur(16px)",
                  border: "1px solid rgba(16,185,129,.28)", borderRadius: "16px",
                  padding: ".85rem 1.2rem",
                }}>
                  <div style={{ color: "#10b981", fontWeight: 800, fontSize: "1rem" }}>✓ Verified</div>
                  <div style={{ color: "#64748b", fontSize: ".75rem" }}>All Providers</div>
                </div>

              </div>

              {/* Headline below image */}
              <div style={{ marginTop: "1.8rem" }}>
                <h4 style={{ fontWeight: 800, marginBottom: ".6rem" }}>Trusted by Thousands Across India</h4>
                <p style={{ color: "#94a3b8", maxWidth: "480px", margin: "0 auto" }}>
                  FixIt connects you with verified professionals for all your home repair &amp; maintenance needs.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="container mt-5">
        <div style={{
          background: "linear-gradient(145deg,rgba(6,182,212,.08),rgba(139,92,246,.06))",
          border: "1px solid rgba(255,255,255,.07)",
          borderRadius: "28px", padding: "3rem 2rem",
        }}>
          <div className="row g-3 text-center">
            {STATS.map(s => (
              <div className="col-6 col-md-3" key={s.label}>
                <i className={`bi ${s.icon}`} style={{ color: s.color, fontSize: "1.8rem", marginBottom: ".5rem", display: "block" }} />
                <h2 style={{ fontSize: "2rem", fontWeight: 900, background: "linear-gradient(135deg,#06b6d4,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.val}</h2>
                <p style={{ color: "#94a3b8", fontSize: ".88rem", marginBottom: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="container mt-5 pt-2">
        <div className="section-heading">
          <h2>Why Choose <span className="g-text">FixIt</span>?</h2>
          <div className="section-divider" />
          <p>Everything you need for reliable, hassle-free home services</p>
        </div>
        <div className="row g-4">
          {WHY.map(f => (
            <div className="col-md-6 col-lg-3" key={f.title}>
              <div className="feature-card" style={{ height: "100%" }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "16px",
                  background: `${f.color}18`, border: `1px solid ${f.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.2rem", fontSize: "1.4rem",
                }}>
                  <i className={`bi ${f.icon}`} style={{ color: f.color }} />
                </div>
                <h5 style={{ fontWeight: 800, marginBottom: ".5rem" }}>{f.title}</h5>
                <p style={{ color: "#94a3b8", fontSize: ".88rem", marginBottom: 0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="container mt-5 pt-2">
        <div className="section-heading">
          <h2>Our <span className="g-text">Services</span></h2>
          <div className="section-divider" />
          <p>Click a service to browse available experts near you</p>
        </div>
        <div className="row g-3 justify-content-center">
          {[
            { emoji:"🔧", name:"Plumbing",    path:"/services/plumbing",    from:"#06b6d4", to:"#0891b2" },
            { emoji:"⚡", name:"Electrician", path:"/services/electrician", from:"#f59e0b", to:"#d97706" },
            { emoji:"🪚", name:"Carpenter",   path:"/services/carpenter",   from:"#8b5cf6", to:"#7c3aed" },
            { emoji:"🎨", name:"Painting",    path:"/services/painting",    from:"#ec4899", to:"#db2777" },
            { emoji:"🧹", name:"Cleaning",    path:"/services/cleaning",    from:"#10b981", to:"#059669" },
          ].map(s => (
            <div className="col-6 col-md-4 col-lg-2" key={s.name}>
              <div onClick={() => navigate(s.path)} role="button" tabIndex={0}
                onKeyDown={e => e.key === "Enter" && navigate(s.path)}
                style={{
                  cursor: "pointer", borderRadius: "18px", padding: "1.5rem 1rem",
                  background: `linear-gradient(145deg,${s.from}15,${s.to}10)`,
                  border: `1px solid ${s.from}25`,
                  textAlign: "center", transition: "all .3s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${s.from}30`; e.currentTarget.style.borderColor = `${s.from}55`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = `${s.from}25`; }}
              >
                <div style={{ fontSize: "2.4rem", marginBottom: ".7rem" }}>{s.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: ".92rem", color: "#e2e8f0" }}>{s.name}</div>
                <div style={{ marginTop: ".5rem" }}>
                  <span style={{ fontSize: ".75rem", color: s.from, fontWeight: 700 }}>Book Now →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
