import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
    if (adminToken) navigate("/admin");
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/admin/login", formData);
      sessionStorage.setItem("adminToken", res.data.token);
      navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card card">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "18px",
            background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.30)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.2rem", fontSize: "1.6rem",
          }}>
            <i className="bi bi-shield-lock" style={{ color: "var(--accent-light)" }}></i>
          </div>
          <h2>Admin Access</h2>
          <p className="auth-subtitle">Sign in to manage the FixIt platform</p>
          <div className="admin-badge" style={{ justifyContent: "center", display: "inline-flex" }}>
            <i className="bi bi-shield-check"></i> Secure Admin Portal
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Admin Email</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope"></i></span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter admin email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock"></i></span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter admin password"
                name="password"
                onChange={handleChange}
                required
              />
              <span className="input-group-text" style={{ cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
                <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
              </span>
            </div>
          </div>

          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={loading}
            style={{ padding: "0.75rem", fontSize: "1rem", borderRadius: "12px", background: "linear-gradient(135deg, #7C3AED, #A78BFA)" }}
          >
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2"></span>Authenticating...</>
            ) : (
              <><i className="bi bi-shield-check me-2"></i>Sign In as Admin</>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
