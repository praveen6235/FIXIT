import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm py-3">
        <div className="container">
          <Link className="navbar-brand" to="/">
            FixIt
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
            <ul className="navbar-nav ms-auto">

              <li className="nav-item mx-3">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle mx-3"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Services
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/services/plumbing">
                      Plumbing
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/services/electrician">
                      Electrician
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/services/carpenter">
                      Carpenter
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/services/cleaning">
                      Cleaning
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/services/painting">
                      Painting
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item mx-3">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>

              <li className="nav-item mx-3">
                <Link className="nav-link" to={user ? "/mybookings" : "/login"}>
                  My Bookings
                </Link>
              </li>
              <li className="nav-item mx-3 position-relative">
                <i
                  className="bi bi-person-circle text-white fs-4"
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpen(!open)}
                ></i>

                {open && (
                  <div
                    className="card shadow"
                    style={{
                      position: "absolute",
                      top: "45px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "220px",
                      zIndex: "1000",
                    }}
                  >
                    <div className="card-body text-start">
                      {user ? (
                        <>
                          <h6 className="mb-1">
                            <strong>Name:</strong>
                            <span className="ms-2">
                              {user?.firstName} {user?.lastName}
                            </span>
                          </h6>

                          <h6 className="mb-1">
                            <strong>Contact:</strong>
                            <span className="ms-2">{user?.contact}</span>
                          </h6>

                          <p className="small">
                            <strong>Email:</strong>
                            <span className="ms-2">{user?.email}</span>
                          </p>

                          <hr />

                          <button
                            className="btn btn-danger w-100"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-primary w-100 mb-2"
                            onClick={() => navigate("/login")}
                          >
                            User Login
                          </button>

                          <button
                            className="btn btn-dark w-100 mb-2"
                            onClick={() => navigate("/admin/login")}
                          >
                            Admin Login
                          </button>

                          <button
                            className="btn btn-success w-100"
                            onClick={() => navigate("/provider/login")}
                          >
                            Provider Login
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div style={{ height: "80px" }}></div>
    </>
  );
}

