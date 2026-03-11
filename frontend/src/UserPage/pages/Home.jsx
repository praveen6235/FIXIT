import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row align-items-center">

        <div className="col-md-6">
          <h1 className="fw-bold mb-4">Home services at your doorstep</h1>

          <div className="home card p-4 shadow">
            <h5 className="mb-3">What are you looking for?</h5>

            <div className="row text-center">
              <div className="col-4 mb-3">
                <div
                  className="border rounded p-3 service-card"
                  onClick={() => navigate("/services/plumbing")}
                >
                  <img
                    src="https://wallpapers.com/images/hd/plumbing-service-icon-itdl7awjnld09u0r.jpg"
                    width="40"
                    alt="plumbing"
                  />
                  <p className="mt-2 small">Plumbing</p>
                </div>
              </div>
              <div className="col-4 mb-3">
                <div
                  className="border rounded p-3 service-card"
                  onClick={() => navigate("/services/electrician")}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1048/1048940.png"
                    width="40"
                    alt="electrician"
                  />
                  <p className="mt-2 small">Electrician</p>
                </div>
              </div>
              <div className="col-4 mb-3">
                <div
                  className="border rounded p-3 service-card"
                  onClick={() => navigate("/services/carpenter")}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
                    width="40"
                    alt="carpenter"
                  />
                  <p className="mt-2 small">Carpenter</p>
                </div>
              </div>
              <div className="col-6 mb-3">
                <div
                  className="border rounded p-3 service-card"
                  onClick={() => navigate("/services/painting")}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/995/995053.png"
                    width="40"
                    alt="ac repair"
                  />
                  <p className="mt-2 small">AC Repair</p>
                </div>
              </div>
              <div className="col-6 mb-3">
                <div
                  className="border rounded p-3 service-card"
                  onClick={() => navigate("/services/cleaning")}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4257/4257483.png"
                    width="40"
                    alt="cleaning"
                  />
                  <p className="mt-2 small">Cleaning</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 text-center">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "350px" }}
            alt="home services"
          />

          <h4 className="mt-4">Trusted Home Services</h4>

          <p className="text-muted">
            FixIt connects you with trusted professionals for plumbing,
            electrical repairs, carpentry, AC servicing and cleaning. Book
            skilled service providers quickly and get quality work done at your
            doorstep.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/services")}
          >
            Explore Services
          </button>
        </div>
      </div>
    </div>
  );
}

