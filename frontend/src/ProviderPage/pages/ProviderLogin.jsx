import { useState } from "react";
import API from "../../service/api";
import { useNavigate } from "react-router-dom";

export default function ProviderLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/providers/login", form);

      sessionStorage.setItem("provider", JSON.stringify(res.data.provider));
      sessionStorage.setItem("providerToken", res.data.token);
      sessionStorage.setItem("providerId", res.data.provider._id);

      alert("Login Successful");

      navigate("/provider/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div className="login card shadow p-4" style={{ width: "400px" }}>
          <h2 className="text-center mb-4">
            <i className="bi bi-person-badge me-2"></i>
            Provider Login
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-envelope me-2"></i>Email
              </label>

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

            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-lock me-2"></i>Password
              </label>

              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <i className="bi bi-eye-slash"></i>
                  ) : (
                    <i className="bi bi-eye"></i>
                  )}
                </span>
              </div>
            </div>

            <button className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
