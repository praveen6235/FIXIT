import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../service/api";

export default function Plumbing() {
  const navigate = useNavigate();

  const [plumbers, setPlumbers] = useState([]);

  const fetchProviders = async () => {
    try {
      const res = await API.get("/providers");
      const plumbingProviders = res.data.filter(
        (p) => p.service === "Plumbing",
      );

      setPlumbers(plumbingProviders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center fw-bold mb-5">Plumbing Services</h1>

      <div className="row">
        {plumbers.length === 0 ? (
          <p className="text-center">No plumbing providers available.</p>
        ) : (
          plumbers.map((plumber) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={plumber._id}>
              <div className="card shadow border-0 service-card h-100">
                <img
                  src={`https://fixit-ce61.onrender.com/uploads/${plumber.image}`}
                  className="card-img-top"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                  }}
                  alt="plumber"
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold">{plumber.name}</h5>

                  <p className="text-muted">{plumber.service}</p>

                  <h6 className="text-dark fw-bold">₹{plumber.price}</h6>

                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() =>
                      navigate("/booking", { state: { provider: plumber } })
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

