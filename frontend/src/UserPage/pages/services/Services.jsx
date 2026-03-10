import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../service/api";

export default function Services() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [providers, setProviders] = useState([]);

  const fetchProviders = async () => {
    try {
      const res = await API.get("/providers");

      const shuffled = res.data.sort(() => 0.5 - Math.random());

      setProviders(shuffled.slice(0, 16));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);


  const filteredProviders = providers.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.service.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Our Service Professionals</h2>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by service or provider name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {filteredProviders.map((p) => (
          <div className="col-md-3 mb-4" key={p._id}>
            <div className="card service-card shadow-sm h-100">
              <img
                src={`https://fixit-ce61.onrender.com/uploads/${p.image}`}
                className="card-img-top"
                style={{ height: "160px", objectFit: "cover" }}
                alt={p.name}
              />

              <div className="card-body text-center">
                <h5 className="card-title">{p.name}</h5>

                <p className="text-muted">{p.service}</p>

                <h6 className="text-dark">₹{p.price}</h6>

                <button
                  className="btn btn-primary w-100"
                  onClick={() =>
                    navigate("/booking", { state: { provider: p } })
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

