import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  const features = [
    { icon:"👨‍🔧", color:"#06b6d4", bg:"rgba(6,182,212,.1)",  border:"rgba(6,182,212,.22)", title:"Verified Professionals", desc:"All providers are background-checked, trained and rated by real customers." },
    { icon:"💰",   color:"#f59e0b", bg:"rgba(245,158,11,.1)", border:"rgba(245,158,11,.22)", title:"Affordable Prices",       desc:"Transparent, upfront pricing — no surprise bills, no hidden charges." },
    { icon:"⚡",   color:"#8b5cf6", bg:"rgba(139,92,246,.1)", border:"rgba(139,92,246,.22)", title:"Fast Booking",            desc:"Book in under 2 minutes. Get a confirmed professional the same day." },
    { icon:"⭐",   color:"#ec4899", bg:"rgba(236,72,153,.1)", border:"rgba(236,72,153,.22)", title:"5-Star Guarantee",        desc:"We stand behind our quality. Not happy? We'll make it right." },
  ];

  const stats = [
    { val:"500+",  label:"Happy Customers", color:"#06b6d4" },
    { val:"150+",  label:"Service Experts", color:"#8b5cf6" },
    { val:"1000+", label:"Jobs Completed",  color:"#10b981" },
    { val:"4.9★",  label:"Customer Rating", color:"#f59e0b" },
  ];

  return (
    <div style={{ paddingBottom: "5rem" }}>

      {/* ── HERO with BG IMAGE ── */}
      <section style={{
        position: "relative", minHeight: "480px",
        display: "flex", alignItems: "center",
        overflow: "hidden",
      }}>
        {/* Background image with dark overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&auto=format&fit=crop&q=80')",
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(.25) saturate(1.2)",
        }} />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg,rgba(6,182,212,.35) 0%,rgba(4,7,18,.9) 60%,rgba(139,92,246,.25) 100%)",
        }} />
        {/* Glow orbs */}
        <div style={{ position:"absolute", top:"-60px", left:"-60px", width:"350px", height:"350px", borderRadius:"50%", background:"rgba(6,182,212,.2)", filter:"blur(90px)" }} />
        <div style={{ position:"absolute", bottom:"-40px", right:"-40px", width:"280px", height:"280px", borderRadius:"50%", background:"rgba(139,92,246,.2)", filter:"blur(80px)" }} />

        <div className="container" style={{ position:"relative", zIndex:2 }}>
          <div className="row justify-content-center text-center">
            <div className="col-lg-8 anim-up">
              <div className="hero-badge" style={{ justifyContent:"center" }}>
                <i className="bi bi-info-circle-fill" />About FixIt
              </div>
              <h1 style={{ fontSize:"clamp(2.2rem,5vw,3.6rem)", fontWeight:900, lineHeight:1.1, marginBottom:"1.1rem" }}>
                We Connect You With<br/>
                <span className="g-text">Trusted Professionals</span>
              </h1>
              <p style={{ color:"#94a3b8", fontSize:"1.1rem", maxWidth:"580px", margin:"0 auto 2rem", lineHeight:1.75 }}>
                FixIt is India's modern home service platform — making it simple to book verified
                plumbers, electricians, carpenters and cleaning experts right at your door.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <button className="btn btn-primary" onClick={() => navigate("/services")}
                  style={{ padding:".7rem 1.8rem", borderRadius:"12px" }}>
                  <i className="bi bi-grid me-2" />Explore Services
                </button>
                <button className="btn btn-outline-light" onClick={() => navigate("/register")}
                  style={{ padding:".7rem 1.8rem", borderRadius:"12px" }}>
                  <i className="bi bi-person-plus me-2" />Join Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="container mt-5 pt-2">
        <div className="row align-items-center g-5">
          <div className="col-md-5">
            <div style={{ position:"relative" }}>
              <div style={{
                position:"absolute", inset:"8px",
                borderRadius:"22px",
                background:"linear-gradient(135deg,rgba(6,182,212,.25),rgba(139,92,246,.2))",
                filter:"blur(25px)",
              }} />
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700&auto=format&fit=crop&q=80"
                alt="About FixIt"
                style={{
                  width:"100%", borderRadius:"22px",
                  border:"1px solid rgba(6,182,212,.2)",
                  boxShadow:"0 24px 60px rgba(0,0,0,.5)",
                  position:"relative", zIndex:1,
                }}
              />
            </div>
          </div>
          <div className="col-md-7">
            <div className="hero-badge"><i className="bi bi-building" />Our Story</div>
            <h2 style={{ fontWeight:900, fontSize:"clamp(1.8rem,3vw,2.4rem)", marginBottom:"1rem" }}>
              Who <span className="g-text">We Are</span>
            </h2>
            <p style={{ color:"#94a3b8", lineHeight:1.8, marginBottom:"1rem" }}>
              FixIt was born from a simple idea: finding a reliable home service professional
              shouldn't be difficult, stressful, or expensive. We built a platform that puts
              quality, trust and convenience first.
            </p>
            <p style={{ color:"#94a3b8", lineHeight:1.8, marginBottom:"1.8rem" }}>
              Every provider on FixIt is verified, trained and reviewed by real customers.
              We handle the matching — you just sit back and get great service.
            </p>
            <div className="row g-3">
              {[
                { icon:"bi-shield-check", color:"#06b6d4", label:"Verified & Insured Providers" },
                { icon:"bi-clock",        color:"#8b5cf6", label:"Same-Day Service Available" },
                { icon:"bi-headset",      color:"#10b981", label:"24/7 Customer Support" },
                { icon:"bi-award",        color:"#f59e0b", label:"Satisfaction Guaranteed" },
              ].map(f => (
                <div className="col-6" key={f.label}>
                  <div style={{ display:"flex", alignItems:"center", gap:".6rem", padding:".75rem 1rem", borderRadius:"12px", background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)" }}>
                    <i className={`bi ${f.icon}`} style={{ color:f.color, fontSize:"1.1rem", flexShrink:0 }} />
                    <span style={{ color:"#cbd5e1", fontSize:".84rem", fontWeight:600 }}>{f.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="container mt-5 pt-2">
        <div className="section-heading">
          <h2>Why Choose <span className="g-text">FixIt</span></h2>
          <div className="section-divider" />
          <p>We don't just connect you — we guarantee the experience</p>
        </div>
        <div className="row g-4">
          {features.map(f => (
            <div className="col-md-6 col-lg-3" key={f.title}>
              <div className="feature-card" style={{ height:"100%" }}>
                <div style={{
                  width:"62px", height:"62px", borderRadius:"18px",
                  background:f.bg, border:`1px solid ${f.border}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  margin:"0 auto 1.2rem", fontSize:"1.8rem",
                }}>{f.icon}</div>
                <h5 style={{ fontWeight:800, marginBottom:".5rem" }}>{f.title}</h5>
                <p style={{ color:"#94a3b8", fontSize:".87rem", marginBottom:0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="container mt-5">
        <div style={{
          borderRadius:"28px", padding:"3.5rem 2rem",
          background:"linear-gradient(145deg,rgba(6,182,212,.09),rgba(139,92,246,.07))",
          border:"1px solid rgba(255,255,255,.07)",
          position:"relative", overflow:"hidden",
        }}>
          <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"250px", height:"250px", borderRadius:"50%", background:"rgba(6,182,212,.12)", filter:"blur(60px)" }} />
          <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"200px", height:"200px", borderRadius:"50%", background:"rgba(139,92,246,.12)", filter:"blur(50px)" }} />
          <div className="section-heading" style={{ position:"relative", zIndex:1 }}>
            <h2>Our <span className="g-text">Impact</span></h2>
            <div className="section-divider" />
          </div>
          <div className="row g-4 text-center" style={{ position:"relative", zIndex:1 }}>
            {stats.map(s => (
              <div className="col-6 col-md-3" key={s.label}>
                <h2 style={{ fontSize:"2.4rem", fontWeight:900, color:s.color, marginBottom:".3rem" }}>{s.val}</h2>
                <p style={{ color:"#94a3b8", fontSize:".9rem", marginBottom:0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container mt-5 text-center">
        <div style={{
          borderRadius:"24px", padding:"3rem 2rem",
          background:"linear-gradient(135deg,rgba(6,182,212,.1),rgba(139,92,246,.08))",
          border:"1px solid rgba(6,182,212,.2)",
        }}>
          <h2 style={{ fontWeight:900, marginBottom:".75rem" }}>Ready to Get Started?</h2>
          <p style={{ color:"#94a3b8", marginBottom:"1.8rem", maxWidth:"480px", margin:"0 auto 1.8rem" }}>
            Book your first service today and experience the FixIt difference.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="btn btn-primary btn-lg" onClick={() => navigate("/services")}
              style={{ padding:".8rem 2rem", borderRadius:"14px" }}>
              <i className="bi bi-arrow-right-circle me-2" />Browse Services
            </button>
            <button className="btn btn-outline-light btn-lg" onClick={() => navigate("/register")}
              style={{ padding:".8rem 2rem", borderRadius:"14px" }}>
              <i className="bi bi-person-plus me-2" />Create Account
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
