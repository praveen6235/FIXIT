import { useState } from "react";
import API from "../../service/api";
import ProviderNavbar from "../components/ProviderNavbar";
import ProviderFooter from "../components/ProviderFooter";

export default function ChangePassword() {
  const providerId = sessionStorage.getItem("providerId");

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("New Password and Confirm Password do not match");
      return;
    }

    try {
      await API.put(`/providers/change-password/${providerId}`, {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      alert("Password Updated Successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Password update failed");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <ProviderNavbar />

      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div className="login card shadow p-4" style={{ width: "400px" }}>
          <h2 className="text-center mb-4">
            <i className="bi bi-key me-2"></i>
            Change Password
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Old Password</label>

              <div className="input-group">
                <input
                  type={showOld ? "text" : "password"}
                  name="oldPassword"
                  placeholder="Enter old password"
                  className="form-control"
                  onChange={handleChange}
                  required
                />

                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowOld(!showOld)}
                >
                  <i className={showOld ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                </span>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">New Password</label>

              <div className="input-group">
                <input
                  type={showNew ? "text" : "password"}
                  name="newPassword"
                  placeholder="Enter new password"
                  className="form-control"
                  onChange={handleChange}
                  required
                />

                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowNew(!showNew)}
                >
                  <i className={showNew ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                </span>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>

              <div className="input-group">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  className="form-control"
                  onChange={handleChange}
                  required
                />

                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  <i
                    className={showConfirm ? "bi bi-eye-slash" : "bi bi-eye"}
                  ></i>
                </span>
              </div>
            </div>

            <button className="btn btn-primary w-100">Update Password</button>
          </form>
        </div>
      </div>

      <ProviderFooter />
    </div>
  );
}
