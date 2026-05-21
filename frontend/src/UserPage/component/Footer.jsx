import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ paddingTop: "3.5rem", paddingBottom: "1.5rem", marginTop: "4rem" }}>
      <div className="container">
        <div className="row g-4 mb-4">

          {/* Brand */}
          <div className="col-md-4">
            <div className="footer-brand mb-3">⚡ FixIt</div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "280px" }}>
              FixIt connects you with trusted professionals for plumbing, electrical repairs,
              carpentry, painting and cleaning. Fast, safe & reliable.
            </p>
            <div className="d-flex gap-3 mt-3">
              {["twitter", "facebook", "instagram", "linkedin"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    width: "36px", height: "36px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text-muted)",
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0,212,255,0.15)";
                    e.currentTarget.style.color = "var(--primary)";
                    e.currentTarget.style.borderColor = "rgba(0,212,255,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
                  }}
                >
                  <i className={`bi bi-${s}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="col-md-3">
            <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-secondary)", marginBottom: "1.2rem" }}>
              Our Services
            </h5>
            <ul className="list-unstyled footer-links">
              {[
                { to: "/services/plumbing",    label: "Plumbing",    icon: "🔧" },
                { to: "/services/electrician", label: "Electrician", icon: "⚡" },
                { to: "/services/carpenter",   label: "Carpenter",   icon: "🪚" },
                { to: "/services/cleaning",    label: "Cleaning",    icon: "🧹" },
                { to: "/services/painting",    label: "Painting",    icon: "🎨" },
              ].map((s) => (
                <li key={s.to}>
                  <Link to={s.to}>
                    <span className="me-2">{s.icon}</span>{s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-md-2">
            <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-secondary)", marginBottom: "1.2rem" }}>
              Quick Links
            </h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-secondary)", marginBottom: "1.2rem" }}>
              Contact
            </h5>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { icon: "bi-envelope", text: "praveenbollam9550@gmail.com" },
                { icon: "bi-telephone", text: "+91 93914 52521" },
                { icon: "bi-geo-alt",   text: "India" },
              ].map((c) => (
                <div key={c.icon} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", color: "var(--text-muted)", fontSize: "0.88rem" }}>
                  <i className={`bi ${c.icon}`} style={{ color: "var(--primary)", marginTop: "2px", flexShrink: 0 }}></i>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <hr className="footer-divider" />

        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2" style={{ paddingTop: "1rem" }}>
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.85rem" }}>
            © 2026 <span style={{ color: "var(--primary)", fontWeight: 700 }}>FixIt</span>. All Rights Reserved.
          </p>
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.8rem" }}>
            Built with ❤️ for trusted home services
          </p>
        </div>
      </div>
    </footer>
  );
}
