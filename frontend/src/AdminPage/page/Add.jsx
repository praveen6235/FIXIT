import { useState } from "react";
import API from "../../service/api";
import AdminNavbar from "../components/AdminNavbar";
import AdminFooter from "../components/AdminFooter";

export default function AddProvider() {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    service: "",
    price: "",
    password: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[6789][0-9]{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !form.name ||
      !form.email ||
      !form.contact ||
      !form.service ||
      !form.price ||
      !form.password
    ) {
      alert("All fields are required");
      return;
    }

    if (!nameRegex.test(form.name)) {
      alert("Name should contain only letters");
      return;
    }

    if (!emailRegex.test(form.email)) {
      alert("Enter valid email");
      return;
    }

    if (!phoneRegex.test(form.contact)) {
      alert("Mobile must start with 6,7,8,9 and be 10 digits");
      return;
    }

    if (isNaN(form.price) || form.price <= 0) {
      alert("Price must be valid");
      return;
    }

    if (!form.image) {
      alert("Please upload provider image");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("contact", form.contact);
      formData.append("service", form.service);
      formData.append("price", form.price);
      formData.append("password", form.password);
      formData.append("image", form.image);

      const token = sessionStorage.getItem("adminToken");

      await API.post("/providers/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Provider Added Successfully");

      setForm({
        name: "",
        email: "",
        contact: "",
        service: "",
        price: "",
        password: "",
        image: null,
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add provider");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <AdminNavbar />

      <div className="flex-grow-1 py-5 mt-5">
        <div className="container pt-4 d-flex justify-content-center">
          <div
            className="card shadow-lg p-4"
            style={{
              width: "450px",
              borderRadius: "15px",
              background: "#ffffff",
            }}
          >
            <h3 className="text-center mb-4 fw-bold">
              <i className="bi bi-person-plus me-2"></i>
              Add Provider
            </h3>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  className="form-control"
                  placeholder="Enter provider name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Contact</label>
                <input
                  className="form-control"
                  placeholder="Enter mobile number"
                  name="contact"
                  maxLength="10"
                  value={form.contact}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Service</label>

                <select
                  className="form-select"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="">Select Service</option>
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>Carpenter</option>
                  <option>Cleaning</option>
                  <option>Painting</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Price</label>
                <input
                  className="form-control"
                  placeholder="Enter service price"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Set Password</label>

                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Set Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
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

              <div className="mb-4">
                <label className="form-label fw-semibold">Upload Image</label>

                <input
                  type="file"
                  className="form-control"
                  name="image"
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn-primary w-100 py-2 fw-semibold">
                Add Provider
              </button>
            </form>
          </div>
        </div>
      </div>

      <AdminFooter />
    </div>
  );
}
