import { useState } from "react";
import API from "../../service/api";
import { useNavigate } from "react-router-dom";

export default function ProviderLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/providers/login", form);
      sessionStorage.setItem("provider", JSON.stringify(res.data.provider));
      sessionStorage.setItem("providerToken", res.data.token);
      sessionStorage.setItem("providerId", res.data.provider._id);
      navigate("/provider/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper" style={{ minHeight: "85vh" }}>
      <div className="auth-card card">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "18px",
            background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.30)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.2rem", fontSize: "1.6rem",
          }}>
            <i className="bi bi-person-badge" style={{ color: "var(--success)" }}></i>
          </div>
          <h2>Provider Login</h2>
          <p className="auth-subtitle">Sign in to your service provider dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope"></i></span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={form.email}
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
                placeholder="Enter your password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <span className="input-group-text" style={{ cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
                <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
              </span>
            </div>
          </div>

          <button
            className="btn btn-success w-100"
            type="submit"
            disabled={loading}
            style={{ padding: "0.75rem", fontSize: "1rem", borderRadius: "12px" }}
          >
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2"></span>Signing in...</>
            ) : (
              <><i className="bi bi-box-arrow-in-right me-2"></i>Sign In as Provider</>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
