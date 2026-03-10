import { Link, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <span className="navbar-brand fw-bold">Admin Panel</span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item mx-lg-3">
              <Link className="nav-link text-white" to="/admin">
                Dashboard
              </Link>
            </li>

            <li className="nav-item mx-lg-3">
              <Link className="nav-link text-white" to="/admin/add">
                Add Provider
              </Link>
            </li>

            <li className="nav-item mx-lg-3">
              <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
