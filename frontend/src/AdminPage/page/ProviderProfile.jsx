import { useEffect, useState } from "react";
import API from "../../service/api";
import ProviderNavbar from "../components/ProviderNavbar";
import ProviderFooter from "../components/ProviderFooter";

export default function ProviderProfile() {
  const provider = JSON.parse(sessionStorage.getItem("provider"));

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    service: "",
    price: "",
  });

  const fetchProvider = async () => {
    const res = await API.get(`/providers/profile/${provider._id}`);

    setForm(res.data);
  };

  useEffect(() => {
    fetchProvider();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.put(`/providers/profile/${provider._id}`, form);

    alert("Profile Updated");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <ProviderNavbar />

      <div className="container mt-4 flex-grow-1">
        <h3 className="mb-4">Provider Profile</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="email"
            value={form.email}
            disabled
          />

          <input
            className="form-control mb-3"
            name="contact"
            value={form.contact}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="service"
            value={form.service}
            disabled
          />

          <input
            className="form-control mb-3"
            name="price"
            value={form.price}
            onChange={handleChange}
          />

          <button className="btn btn-primary">Update Profile</button>
        </form>
      </div>

      <ProviderFooter />
    </div>
  );
}

