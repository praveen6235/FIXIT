import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/api";
import AdminNavbar from "../components/AdminNavbar";
import AdminFooter from "../components/AdminFooter";

export default function Admin() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProviders = async () => {
    try {
      const res = await API.get("/providers");
      setProviders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProviders(); }, []);

  const deleteProvider = async (id) => {
    if (!window.confirm("Are you sure you want to delete this provider?")) return;
    try {
      const token = sessionStorage.getItem("adminToken");
      await API.delete(`/providers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Provider Deleted");
      fetchProviders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminNavbar />

      <div className="container flex-grow-1" style={{ paddingTop: "5rem", paddingBottom: "2rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div className="hero-badge" style={{ marginBottom: "0.5rem" }}>
              <i className="bi bi-grid"></i> Admin Panel
            </div>
            <h3 style={{ margin: 0, fontWeight: 800 }}>
              Providers <span className="gradient-text">Dashboard</span>
            </h3>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
              {providers.length} provider{providers.length !== 1 ? "s" : ""} registered
            </span>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate("/admin/add")}
              style={{ borderRadius: "8px" }}
            >
              <i className="bi bi-person-plus me-1"></i>Add Provider
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <div className="spinner-border" style={{ color: "var(--primary)", width: "3rem", height: "3rem" }}></div>
            <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>Loading providers...</p>
          </div>
        ) : providers.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "4rem",
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "20px",
          }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>👤</div>
            <h5 style={{ color: "var(--text-secondary)" }}>No providers yet</h5>
            <button className="btn btn-primary mt-2" onClick={() => navigate("/admin/add")}>
              Add First Provider
            </button>
          </div>
        ) : (
          <div className="table-responsive table-wrapper">
            <table className="table text-center mb-0">
              <thead>
                <tr>
                  {["#", "Name", "Email", "Contact", "Service", "Price", "Actions"].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {providers.map((p, idx) => (
                  <tr key={p._id}>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{idx + 1}</td>
                    <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{p.name}</td>
                    <td>{p.email}</td>
                    <td>{p.contact}</td>
                    <td>
                      <span className="provider-service-badge" style={{ margin: 0 }}>{p.service}</span>
                    </td>
                    <td style={{ color: "var(--primary)", fontWeight: 700 }}>Rs. {p.price}</td>
                    <td>
                      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => navigate(`/admin/update/${p._id}`)}
                          style={{ borderRadius: "8px", padding: "0.35rem 0.75rem" }}
                        >
                          <i className="bi bi-pencil me-1"></i>Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteProvider(p._id)}
                          style={{ borderRadius: "8px", padding: "0.35rem 0.75rem" }}
                        >
                          <i className="bi bi-trash me-1"></i>Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AdminFooter />
    </div>
  );
}
