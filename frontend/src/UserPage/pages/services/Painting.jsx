import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../service/api";

export default function Painting() {
  const navigate = useNavigate();
  const [painters, setPainters] = useState([]);

  const fetchPainters = async () => {
    try {
      const res = await API.get("/providers");

      const paintingProviders = res.data.filter(
        (p) => p.service === "Painting",
      );

      setPainters(paintingProviders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPainters();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Painting Services</h2>

      <div className="row">
        {painters.map((painter) => (
          <div className="col-md-4 mb-4" key={painter._id}>
            <div className="card shadow service-card">
              <img
                src={`https://fixit-ce61.onrender.com/uploads/${painter.image}`}
                alt={painter.name}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5>{painter.name}</h5>

                <p>{painter.service}</p>

                <h6 className="text-dark">₹{painter.price}</h6>

                <button
                  className="btn btn-primary w-100"
                  onClick={() =>
                    navigate("/booking", { state: { provider: painter } })
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
