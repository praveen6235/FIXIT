import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../service/api";

const API_BASE = "https://fixit-ce61.onrender.com/uploads/";

const SERVICE_ICONS = {
  Plumbing:    "🔧",
  Electrician: "⚡",
  Carpenter:   "🪚",
  Cleaning:    "🧹",
  Painting:    "🎨",
};

export default function Services() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/providers")
      .then((res) => {
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        setProviders(shuffled.slice(0, 16));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = providers.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.service.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container mt-4 mb-5">

      {/* Header */}
      <div className="section-heading">
        <div className="hero-badge" style={{ justifyContent: "center" }}>
          <i className="bi bi-grid"></i> All Services
        </div>
        <h2>Our Service <span className="gradient-text">Professionals</span></h2>
        <div className="section-divider"></div>
        <p>Browse and book from our verified, expert service providers</p>
      </div>

      {/* Search */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by service or provider name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <span className="input-group-text" style={{ cursor: "pointer" }} onClick={() => setSearch("")}>
                <i className="bi bi-x-lg"></i>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Provider Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <div className="spinner-border" style={{ color: "var(--primary)", width: "3rem", height: "3rem" }}></div>
          <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>Finding professionals...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "4rem",
          background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "20px",
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
          <h5 style={{ color: "var(--text-secondary)" }}>No results found</h5>
          <p style={{ color: "var(--text-muted)" }}>Try a different search term</p>
        </div>
      ) : (
        <div className="row g-4">
          {filtered.map((p) => (
            <div className="col-md-6 col-lg-3" key={p._id}>
              <div className="provider-card card h-100">
                <img
                  src={`${API_BASE}${p.image}`}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                  alt={p.name}
                  onError={(e) => {
                    e.currentTarget.src = "";
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.style.paddingTop = "1rem";
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <span className="provider-service-badge">
                    {SERVICE_ICONS[p.service] || "🛠️"} {p.service}
                  </span>
                  <div className="provider-name mb-1">{p.name}</div>
                  <div className="provider-info-row">
                    <i className="bi bi-telephone"></i>
                    <span>{p.contact}</span>
                  </div>
                  <div className="provider-price mt-2 mb-3">₹{p.price}</div>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => navigate("/booking", { state: { provider: p } })}
                    style={{ borderRadius: "10px" }}
                  >
                    <i className="bi bi-calendar-check me-2"></i>Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
