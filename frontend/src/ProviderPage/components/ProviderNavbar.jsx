import { Link, useNavigate } from "react-router-dom";

export default function ProviderNavbar() {
  const navigate = useNavigate();

  const provider = JSON.parse(sessionStorage.getItem("provider"));

  const handleLogout = () => {
    sessionStorage.removeItem("providerToken");
    sessionStorage.removeItem("provider");
    sessionStorage.removeItem("providerId");

    navigate("/provider/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{ background: "#1f2a36" }}
    >
      <div className="container">

        <Link
          className="navbar-brand fw-bold text-light"
          to="/provider/dashboard"
        >
          <i className="bi bi-tools me-2 text-warning"></i>
          Provider Panel
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
        
            <li className="nav-item mx-2">
              <Link
                className="nav-link text-light fw-semibold"
                to="/provider/dashboard"
              >
                <i className="bi bi-speedometer2 me-1"></i>
                Dashboard
              </Link>
            </li>

            <li className="nav-item dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-person-circle me-2"></i>

                {provider?.name || "Provider"}
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow">
                <li>
                  <Link className="dropdown-item" to="/provider/profile">
                    <i className="bi bi-person-lines-fill me-2"></i>
                    Provider Details
                  </Link>
                </li>

                <li>
                  <Link
                    className="dropdown-item"
                    to="/provider/change-password"
                  >
                    <i className="bi bi-key me-2"></i>
                    Change Password
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

