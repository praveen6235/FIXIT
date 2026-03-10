import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../service/api";

export default function Booking() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const provider = location.state?.provider;

  const [form, setForm] = useState({
    name: user?.firstName || "",
    phone: "",
    address: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/bookings", {
        userName: form.name,
        userPhone: form.phone,
        userEmail: user.email,
        address: form.address,

        providerName: provider.name,
        providerPhone: provider.contact,

        service: provider.service,
        date: form.date,
        time: form.time,
      });

      alert("Booking Request Sent!");

      navigate("/mybookings");
    } catch (error) {
      alert("Booking failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Book Your Service</h3>

            <div className="alert alert-info">
              <strong>Service:</strong> {provider?.service} <br />
              <strong>Provider:</strong> {provider?.name}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Address</label>
                <textarea
                  className="form-control"
                  name="address"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label>Select Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="date"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Select Time Slot</label>

                <select
                  className="form-control"
                  name="time"
                  onChange={handleChange}
                  required
                >
                  <option>Select Time</option>
                  <option>09:00 AM</option>
                  <option>11:00 AM</option>
                  <option>01:00 PM</option>
                  <option>03:00 PM</option>
                  <option>05:00 PM</option>
                </select>
              </div>

              <button className="btn btn-success w-100">Confirm Booking</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
