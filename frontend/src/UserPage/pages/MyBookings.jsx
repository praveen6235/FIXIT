import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/api";

const STATUS_STYLE = {
  Pending:   { bg: "rgba(245,158,11,0.15)",  color: "#F59E0B", border: "rgba(245,158,11,0.30)",  icon: "bi-hourglass-split" },
  Confirmed: { bg: "rgba(16,185,129,0.15)",  color: "#10B981", border: "rgba(16,185,129,0.30)",  icon: "bi-check-circle-fill" },
  Cancelled: { bg: "rgba(239,68,68,0.15)",   color: "#EF4444", border: "rgba(239,68,68,0.30)",   icon: "bi-x-circle-fill" },
};

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    API.get(`/bookings/user/${user.email}`)
      .then((res) => setBookings(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4 mb-5" style={{ minHeight: "65vh" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div className="hero-badge" style={{ justifyContent: "center" }}>
          <i className="bi bi-calendar-check"></i>
          My Bookings
        </div>
        <h2 style={{ fontWeight: 800 }}>
          Your <span className="gradient-text">Service History</span>
        </h2>
        {user && (
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
            Bookings for <span style={{ color: "var(--primary)" }}>{user.email}</span>
          </p>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <div className="spinner-border" style={{ color: "var(--primary)", width: "3rem", height: "3rem" }}></div>
          <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>Loading your bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "4rem 2rem",
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: "20px",
        }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📋</div>
          <h4 style={{ color: "var(--text-secondary)" }}>No bookings yet</h4>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            You haven't booked any services yet. Explore our services and book one!
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/services")}>
            <i className="bi bi-grid me-2"></i>Browse Services
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {bookings.map((booking) => {
            const s = STATUS_STYLE[booking.status] || STATUS_STYLE.Pending;
            return (
              <div className="col-md-6 col-lg-4" key={booking._id}>
                <div className="booking-status-card card" style={{ height: "100%" }}>

                  {/* Service Header */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}>
                    <div>
                      <div className="provider-service-badge">{booking.service}</div>
                      <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary)" }}>
                        {booking.providerName}
                      </div>
                    </div>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: "0.35rem",
                      background: s.bg, color: s.color,
                      border: `1px solid ${s.border}`,
                      borderRadius: "50px", padding: "0.3rem 0.75rem",
                      fontSize: "0.78rem", fontWeight: 700,
                    }}>
                      <i className={`bi ${s.icon}`}></i>
                      {booking.status}
                    </div>
                  </div>

                  {/* Details */}
                  {[
                    { icon: "bi-telephone", label: booking.providerPhone },
                    { icon: "bi-geo-alt",   label: booking.address },
                    { icon: "bi-calendar",  label: booking.date },
                    { icon: "bi-clock",     label: booking.time },
                  ].map((d) => (
                    <div className="provider-info-row" key={d.icon}>
                      <i className={`bi ${d.icon}`}></i>
                      <span>{d.label}</span>
                    </div>
                  ))}

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
