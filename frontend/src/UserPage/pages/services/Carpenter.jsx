import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../service/api";

export default function Carpenter() {
  const navigate = useNavigate();

  const [carpenters, setCarpenters] = useState([]);

  const fetchCarpenters = async () => {
    try {
      const res = await API.get("/providers");

      const carpenterProviders = res.data.filter(
        (p) => p.service === "Carpenter",
      );

      setCarpenters(carpenterProviders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarpenters();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Carpenter Services</h2>

      <div className="row">
        {carpenters.map((carpenter) => (
          <div className="col-md-4 mb-4" key={carpenter._id}>
            <div className="card shadow service-card">
              <img
                src={`http://localhost:5000/uploads/${carpenter.image}`}
                alt={carpenter.name}
                style={{ height: "180px", objectFit: "cover" }}
                className="card-img-top"
              />

              <div className="card-body">
                <h5>{carpenter.name}</h5>

                <p>{carpenter.service}</p>

                <h6 className="text-dark">₹{carpenter.price}</h6>

                <button
                  className="btn btn-primary w-100"
                  onClick={() =>
                    navigate("/booking", { state: { provider: carpenter } })
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

