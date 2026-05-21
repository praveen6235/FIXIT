import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../service/api";

const API_BASE = "https://fixit-ce61.onrender.com/uploads/";

export default function ServicePage({ serviceType, emoji, description }) {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/providers")
      .then((res) => {
        const filtered = res.data.filter((p) => p.service === serviceType);
        setProviders(filtered);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [serviceType]);

  return (
    <div className="container mt-4 mb-5">

      {/* Header */}
      <div className="section-heading">
        <div className="hero-badge" style={{ justifyContent: "center" }}>
          <span>{emoji}</span> {serviceType}
        </div>
        <h2><span className="gradient-text">{serviceType}</span> Services</h2>
        <div className="section-divider"></div>
        {description && <p>{description}</p>}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <div className="spinner-border" style={{ color: "var(--primary)", width: "3rem", height: "3rem" }}></div>
          <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>Finding {serviceType.toLowerCase()} experts...</p>
        </div>
      ) : providers.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "4rem",
          background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "20px",
        }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>{emoji}</div>
          <h5 style={{ color: "var(--text-secondary)" }}>No providers available right now</h5>
          <p style={{ color: "var(--text-muted)" }}>Check back soon or try another service.</p>
          <button className="btn btn-primary mt-2" onClick={() => navigate("/services")}>
            Browse All Services
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {providers.map((p) => (
            <div className="col-md-6 col-lg-4" key={p._id}>
              <div className="provider-card card h-100">
                <img
                  src={`${API_BASE}${p.image}`}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  alt={p.name}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="card-body d-flex flex-column" style={{ padding: "1.5rem" }}>
                  <span className="provider-service-badge">
                    {emoji} {p.service}
                  </span>
                  <div className="provider-name mb-2" style={{ fontSize: "1.15rem" }}>{p.name}</div>

                  <div className="provider-info-row">
                    <i className="bi bi-envelope"></i>
                    <span style={{ wordBreak: "break-all" }}>{p.email}</span>
                  </div>
                  <div className="provider-info-row">
                    <i className="bi bi-telephone"></i>
                    <span>{p.contact}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem", marginBottom: "1rem" }}>
                    <div className="provider-price">₹{p.price}</div>
                    <div style={{ display: "flex", gap: "3px" }}>
                      {[1,2,3,4,5].map((s) => (
                        <i key={s} className="bi bi-star-fill" style={{ color: "#F59E0B", fontSize: "0.75rem" }}></i>
                      ))}
                    </div>
                  </div>

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
