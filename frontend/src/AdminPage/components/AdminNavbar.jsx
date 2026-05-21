import { Link, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top admin-navbar" style={{ zIndex: 1030 }}>
      <div className="container">
        <span className="navbar-brand" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{
            fontFamily: "'Outfit', sans-serif", fontSize: "1.4rem", fontWeight: 800,
            background: "var(--gradient-text)", WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            ⚡ FixIt
          </span>
          <span className="admin-badge">Admin</span>
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                <i className="bi bi-grid me-1"></i>Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/add">
                <i className="bi bi-person-plus me-1"></i>Add Provider
              </Link>
            </li>
            <li className="nav-item ms-lg-2">
              <button
                className="btn btn-danger btn-sm"
                onClick={handleLogout}
                style={{ borderRadius: "8px", padding: "0.4rem 1rem" }}
              >
                <i className="bi bi-box-arrow-right me-1"></i>Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
