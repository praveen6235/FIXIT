import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");

    if (adminToken) {
      navigate("/admin");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/admin/login", formData);
      sessionStorage.setItem("adminToken", res.data.token);

      alert("Admin Login Successful");

      navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="login card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">
          <i className="bi bi-person-circle me-2"></i>
          Admin Login
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

          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

