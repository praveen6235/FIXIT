import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top" style={{ zIndex: 1030 }}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            ⚡ FixIt
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">

              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="bi bi-house me-1"></i>Home
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-grid me-1"></i>Services
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/services/plumbing">
                      🔧 Plumbing
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/services/electrician">
                      ⚡ Electrician
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/services/carpenter">
                      🪚 Carpenter
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/services/cleaning">
                      🧹 Cleaning
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/services/painting">
                      🎨 Painting
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  <i className="bi bi-info-circle me-1"></i>About
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={user ? "/mybookings" : "/login"}>
                  <i className="bi bi-calendar-check me-1"></i>My Bookings
                </Link>
              </li>

              <li className="nav-item ms-lg-2 position-relative">
                <button
                  className="btn btn-outline-light btn-sm d-flex align-items-center gap-2"
                  onClick={() => setOpen(!open)}
                  style={{ borderRadius: "50px", padding: "0.4rem 1rem" }}
                >
                  <i className="bi bi-person-circle fs-5"></i>
                  {user ? (
                    <span style={{ fontSize: "0.82rem" }}>
                      {user.firstName}
                    </span>
                  ) : (
                    <span style={{ fontSize: "0.82rem" }}>Sign In</span>
                  )}
                </button>

                {open && (
                  <div
                    style={{
                      position: "absolute",
                      top: "52px",
                      right: "0",
                      width: "240px",
                      zIndex: 2000,
                      background: "rgba(13,20,40,0.97)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      borderRadius: "16px",
                      padding: "1.2rem",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    {user ? (
                      <>
                        <div style={{ marginBottom: "0.8rem", paddingBottom: "0.8rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                          <div style={{ color: "#94A3B8", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "0.5rem" }}>
                            Signed in as
                          </div>
                          <div style={{ fontWeight: 700, color: "#F1F5F9", fontSize: "0.95rem" }}>
                            {user?.firstName} {user?.lastName}
                          </div>
                          <div style={{ color: "#64748B", fontSize: "0.82rem", marginTop: "0.2rem" }}>
                            {user?.email}
                          </div>
                          <div style={{ color: "#64748B", fontSize: "0.82rem" }}>
                            📞 {user?.contact}
                          </div>
                        </div>
                        <button
                          className="btn btn-danger w-100"
                          onClick={handleLogout}
                          style={{ borderRadius: "10px" }}
                        >
                          <i className="bi bi-box-arrow-right me-2"></i>Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <div style={{ color: "#94A3B8", fontSize: "0.8rem", marginBottom: "1rem", textAlign: "center" }}>
                          Choose how to sign in
                        </div>
                        <button
                          className="btn btn-primary w-100 mb-2"
                          onClick={() => { navigate("/login"); setOpen(false); }}
                          style={{ borderRadius: "10px" }}
                        >
                          <i className="bi bi-person me-2"></i>User Login
                        </button>
                        <button
                          className="btn btn-dark w-100 mb-2"
                          onClick={() => { navigate("/admin/login"); setOpen(false); }}
                          style={{ borderRadius: "10px" }}
                        >
                          <i className="bi bi-shield-lock me-2"></i>Admin Login
                        </button>
                        <button
                          className="btn btn-success w-100"
                          onClick={() => { navigate("/provider/login"); setOpen(false); }}
                          style={{ borderRadius: "10px" }}
                        >
                          <i className="bi bi-wrench me-2"></i>Provider Login
                        </button>
                      </>
                    )}
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div style={{ height: "72px" }}></div>
    </>
  );
}
