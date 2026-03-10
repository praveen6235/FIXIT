import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../service/api";
import ProviderNavbar from "../components/ProviderNavbar";
import ProviderFooter from "../components/ProviderFooter";

export default function ProviderProfile() {
  const providerId = sessionStorage.getItem("providerId");

  const [provider, setProvider] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get(`/providers/profile/${providerId}`);
        setProvider(res.data);
      } catch (error) {
        alert("Failed to load profile");
      }
    };

    fetchProfile();
  }, [providerId]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <ProviderNavbar />

      <div className="container flex-grow-1 d-flex justify-content-center align-items-center">
        <div
          className="card shadow-lg p-4"
          style={{
            width: "750px",
            borderRadius: "20px",
            background: "linear-gradient(135deg,#2c7f90,#a7c7ce)",
          }}
        >
          <h2 className="text-center mb-4 fw-bold text-dark">
            <i className="bi bi-person-circle me-2"></i>
            Provider Profile
          </h2>

          <div className="row align-items-center">
            <div className="col-md-4 text-center">
              <img
                src={`http://localhost:5000/uploads/${provider.image}`}
                alt="profile"
                className="rounded-circle shadow"
                style={{
                  width: "160px",
                  height: "160px",
                  objectFit: "cover",
                  border: "4px solid white",
                }}
              />
            </div>

            <div className="col-md-8">
              <div className="mb-2">
                <i className="bi bi-person-fill me-2"></i>
                <strong>Name:</strong> {provider.name}
              </div>

              <div className="mb-2">
                <i className="bi bi-envelope-fill me-2"></i>
                <strong>Email:</strong> {provider.email}
              </div>

              <div className="mb-2">
                <i className="bi bi-telephone-fill me-2"></i>
                <strong>Contact:</strong> {provider.contact}
              </div>

              <div className="mb-2">
                <i className="bi bi-tools me-2"></i>
                <strong>Service:</strong> {provider.service}
              </div>

              <div className="mb-3">
                <i className="bi bi-currency-rupee me-2"></i>
                <strong>Price:</strong> ₹{provider.price}
              </div>

              <div className="mt-3">
                <Link to="/provider/dashboard" className="btn btn-dark me-2">
                  Dashboard
                </Link>

                <Link
                  to="/provider/change-password"
                  className="btn btn-warning"
                >
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProviderFooter />
    </div>
  );
}
