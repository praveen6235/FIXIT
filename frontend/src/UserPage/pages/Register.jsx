import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../service/api";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", contact: "",
    email: "", password: "", confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[6789][0-9]{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.firstName)) { alert("First name must contain only letters"); return; }
    if (!nameRegex.test(formData.lastName))  { alert("Last name must contain only letters");  return; }
    if (!phoneRegex.test(formData.contact))  { alert("Mobile number must start with 6,7,8,9 and be 10 digits"); return; }
    if (!emailRegex.test(formData.email))    { alert("Enter a valid email address"); return; }
    if (formData.password.length < 6)        { alert("Password must be at least 6 characters"); return; }
    if (formData.password !== formData.confirmPassword) { alert("Passwords do not match"); return; }

    setLoading(true);
    try {
      await API.post("/users/register", {
        firstName: formData.firstName, lastName: formData.lastName,
        contact: formData.contact, email: formData.email, password: formData.password,
      });
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "firstName",  label: "First Name",      type: "text",     placeholder: "Enter first name",      icon: "bi-person" },
    { name: "lastName",   label: "Last Name",        type: "text",     placeholder: "Enter last name",       icon: "bi-person" },
    { name: "contact",    label: "Contact Number",   type: "text",     placeholder: "10-digit mobile number", icon: "bi-telephone", maxLength: "10" },
    { name: "email",      label: "Email Address",    type: "email",    placeholder: "Enter your email",      icon: "bi-envelope" },
  ];

  return (
    <div className="auth-wrapper" style={{ minHeight: "90vh", paddingTop: "2rem", paddingBottom: "2rem" }}>
      <div className="auth-card card" style={{ maxWidth: "460px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "18px",
            background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.30)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.2rem", fontSize: "1.6rem",
          }}>
            <i className="bi bi-person-plus" style={{ color: "var(--accent-light)" }}></i>
          </div>
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join FixIt and book trusted home services</p>
        </div>

        <form onSubmit={handleSubmit}>
          {fields.map((f) => (
            <div className="mb-3" key={f.name}>
              <label className="form-label">{f.label}</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className={`bi ${f.icon}`}></i>
                </span>
                <input
                  type={f.type}
                  className="form-control"
                  name={f.name}
                  placeholder={f.placeholder}
                  maxLength={f.maxLength}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          ))}

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock"></i></span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="Minimum 6 characters"
                onChange={handleChange}
                required
              />
              <span className="input-group-text" onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
              <input
                type={showConfirm ? "text" : "password"}
                className="form-control"
                name="confirmPassword"
                placeholder="Re-enter your password"
                onChange={handleChange}
                required
              />
              <span className="input-group-text" onClick={() => setShowConfirm(!showConfirm)} style={{ cursor: "pointer" }}>
                <i className={`bi bi-eye${showConfirm ? "-slash" : ""}`}></i>
              </span>
            </div>
          </div>

          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={loading}
            style={{ padding: "0.75rem", fontSize: "1rem", borderRadius: "12px" }}
          >
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2"></span>Creating account...</>
            ) : (
              <><i className="bi bi-person-check me-2"></i>Create Account</>
            )}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", color: "var(--text-muted)", fontSize: "0.88rem" }}>
          Already have an account?{" "}
          <Link to="/login" className="auth-link">Sign in →</Link>
        </p>

      </div>
    </div>
  );
}
