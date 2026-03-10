import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/api";
import AdminNavbar from "../components/AdminNavbar";
import AdminFooter from "../components/AdminFooter";

export default function Admin() {
  const [providers, setProviders] = useState([]);

  const navigate = useNavigate();

  const fetchProviders = async () => {
    try {
      const res = await API.get("/providers");
      setProviders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const deleteProvider = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this provider?",
    );

    if (!confirmDelete) return;

    try {
      const token = sessionStorage.getItem("adminToken");

      await API.delete(`/providers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Provider Deleted");

      fetchProviders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <AdminNavbar />

      <div className="container mt-4 flex-grow-1">
        <h3 className="mb-3">Providers Dashboard</h3>

        <div className="table-responsive table-wrapper">
          <table className="table table-bordered text-center mb-0">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Service</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {providers.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.contact}</td>
                  <td>{p.service}</td>
                  <td>Rs. {p.price}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => navigate(`/admin/update/${p._id}`)}
                    >
                      Update
                    </button>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteProvider(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-3"></div>

      <AdminFooter />
    </div>
  );
}
