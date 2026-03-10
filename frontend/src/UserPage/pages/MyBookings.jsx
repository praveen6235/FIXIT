import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));

  const fetchBookings = async () => {
    try {
      const res = await API.get(`/bookings/user/${user.email}`);

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchBookings();
  }, []);

  return (
    <div className="container mt-5" style={{ minHeight: "60vh" }}>
      <h2 className="text-center mb-4">My Bookings</h2>

      <div className="row">
        {bookings.length === 0 ? (
          <p className="text-center">You haven't booked any services yet.</p>
        ) : (
          bookings.map((booking) => (
            <div className="col-md-4 mb-4" key={booking._id}>
              <div className="card shadow p-3">
                <h5 className="fw-bold text-primary">{booking.service}</h5>

                <p>
                  <strong>Provider:</strong> {booking.providerName}
                </p>

                <p>
                  <strong>Phone:</strong> {booking.providerPhone}
                </p>

                <p>
                  <strong>Address:</strong> {booking.address}
                </p>

                <p>
                  <strong>Date:</strong> {booking.date}
                </p>

                <p>
                  <strong>Time:</strong> {booking.time}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      booking.status === "Pending"
                        ? "badge bg-warning text-dark"
                        : booking.status === "Confirmed"
                          ? "badge bg-success"
                          : "badge bg-danger"
                    }
                  >
                    {booking.status}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
