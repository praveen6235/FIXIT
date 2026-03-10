import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../service/api";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[6789][0-9]{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.firstName)) {
      alert("First name must contain only letters");
      return;
    }

    if (!nameRegex.test(formData.lastName)) {
      alert("Last name must contain only letters");
      return;
    }

    if (!phoneRegex.test(formData.contact)) {
      alert("Mobile number must start with 6,7,8,9 and be 10 digits");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      alert("Enter a valid email address");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await API.post("/users/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        contact: formData.contact,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center mt-5"
      style={{ minHeight: "85vh" }}
    >
      <div className="login card shadow p-4" style={{ width: "420px" }}>
        <h2 className="text-center mb-4">
          <i className="bi bi-person-plus me-2"></i>
          Register
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              placeholder="Enter first name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              placeholder="Enter last name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contact Number</label>
            <input
              type="text"
              className="form-control"
              name="contact"
              maxLength="10"
              placeholder="Enter mobile number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="Enter password"
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

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>

            <div className="input-group">
              <input
                type={showConfirm ? "text" : "password"}
                className="form-control"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={handleChange}
                required
              />

              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </span>
            </div>
          </div>

          <button className="btn btn-success w-100 mt-2">Register</button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="fw-bold text-decoration-none">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

