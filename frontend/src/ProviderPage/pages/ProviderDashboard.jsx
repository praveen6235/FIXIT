import { useEffect, useState } from "react";
import API from "../../service/api";
import ProviderNavbar from "../components/ProviderNavbar";
import ProviderFooter from "../components/ProviderFooter";

export default function ProviderDashboard() {
  const [bookings, setBookings] = useState([]);

  const provider = JSON.parse(sessionStorage.getItem("provider"));

  const fetchBookings = async () => {
    try {
      const res = await API.get(`/bookings/provider/${provider.name}`);

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/bookings/${id}`, { status });

      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <ProviderNavbar />

      <div className="container mt-4 flex-grow-1">
        <h3 className="mb-4 text-center">Booking Requests</h3>

        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>User Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="7">No Booking Requests</td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b._id}>
                    <td>{b.userName}</td>

                    <td>{b.userPhone}</td>

                    <td>{b.address}</td>

                    <td>{b.date}</td>

                    <td>{b.time}</td>

                    <td>
                      <span
                        className={
                          b.status === "Pending"
                            ? "badge bg-warning text-dark"
                            : b.status === "Confirmed"
                              ? "badge bg-success"
                              : "badge bg-danger"
                        }
                      >
                        {b.status}
                      </span>
                    </td>

                    <td>
                      {b.status === "Pending" && (
                        <>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => updateStatus(b._id, "Confirmed")}
                          >
                            Accept
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => updateStatus(b._id, "Rejected")}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProviderFooter />
    </div>
  );
}
