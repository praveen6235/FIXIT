import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../service/api";

export default function Cleaning() {
  const navigate = useNavigate();

  const [cleaners, setCleaners] = useState([]);

  const fetchCleaners = async () => {
    try {
      const res = await API.get("/providers");

      const cleaningProviders = res.data.filter(
        (p) => p.service === "Cleaning",
      );

      setCleaners(cleaningProviders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCleaners();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cleaning Services</h2>

      <div className="row">
        {cleaners.map((cleaner) => (
          <div className="col-md-4 mb-4" key={cleaner._id}>
            <div className="card shadow service-card">
              <img
                src={`https://fixit-ce61.onrender.com/uploads/${cleaner.image}`}
                alt={cleaner.name}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5>{cleaner.name}</h5>

                <p>{cleaner.service}</p>

                <h6 className="text-dark">₹{cleaner.price}</h6>

                <button
                  className="btn btn-primary w-100"
                  onClick={() =>
                    navigate("/booking", { state: { provider: cleaner } })
                  }
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

