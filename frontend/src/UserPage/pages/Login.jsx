import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../service/api";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", formData);

      sessionStorage.setItem("token", res.data.token);

      sessionStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (error) {
      alert("Login failed");
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
          User Login
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

        <p className="text-center mt-3">
          If you don't have an account?{" "}
          <Link to="/register" className="fw-bold text-decoration-none">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

