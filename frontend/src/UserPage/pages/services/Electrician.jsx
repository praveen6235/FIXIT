import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../service/api";

export default function Electrical() {
  const navigate = useNavigate();

  const [electricians, setElectricians] = useState([]);

  const fetchElectricians = async () => {
    try {
      const res = await API.get("/providers");

      const electricalProviders = res.data.filter(
        (p) => p.service === "Electrical",
      );

      setElectricians(electricalProviders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchElectricians();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center fw-bold mb-5">Electrical Services</h1>

      <div className="row">
        {electricians.length === 0 ? (
          <p className="text-center">No electricians available.</p>
        ) : (
          electricians.map((electrician) => (
            <div
              className="col-lg-4 col-md-6 col-sm-12 mb-4"
              key={electrician._id}
            >
              <div className="card shadow border-0 service-card h-100">
                <img
                  src={`https://fixit-ce61.onrender.com/uploads/${electrician.image}`}
                  className="card-img-top"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                  }}
                  alt={electrician.name}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold">{electrician.name}</h5>

                  <p className="text-muted">{electrician.service}</p>

                  <h6 className="text-dark fw-bold">₹{electrician.price}</h6>

                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() =>
                      navigate("/booking", { state: { provider: electrician } })
                    }
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

