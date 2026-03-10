import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <div>

      <div className="container mt-5">

        <div className="row align-items-center mb-5">

          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
              className="img-fluid rounded shadow"
              alt="about"
            />
          </div>

          <div className="col-md-6">
            <h2 className="fw-bold">Who We Are</h2>

            <p className="text-muted">
              FixIt is a modern home service booking platform
              designed to connect customers with skilled
              professionals like plumbers, electricians,
              carpenters and cleaning experts.
            </p>

            <p className="text-muted">
              Our platform makes it simple to book trusted
              professionals and get quality service at
              your doorstep quickly and safely.
            </p>

            <button
            className="btn btn-primary"
            onClick={() => navigate("/services")}
          >
            Explore Services
          </button>

          </div>

        </div>

        <h2 className="text-center fw-bold mb-4">
          Why Choose FixIt
        </h2>

        <div className="row text-center mb-5">

          <div className="col-md-4">
            <div className="card p-4 shadow border-0">

              <h3>👨‍🔧</h3>

              <h5 className="mt-2">Verified Professionals</h5>

              <p className="text-muted">
                All service providers are verified and
                experienced professionals.
              </p>

            </div>
          </div>


          <div className="col-md-4">
            <div className="card p-4 shadow border-0">

              <h3>💰</h3>

              <h5 className="mt-2">Affordable Prices</h5>

              <p className="text-muted">
      We provide high-quality home services at
      budget-friendly prices for everyone.
              </p>

            </div>
          </div>


          <div className="col-md-4">
            <div className="card p-4 shadow border-0">

              <h3>⚡</h3>

              <h5 className="mt-2">Fast Service</h5>

              <p className="text-muted">
                Book services instantly and get professionals
                quickly at your doorstep.
              </p>

            </div>
          </div>

        </div>

        <div className="bg-light p-5 rounded text-center mb-5">

          <div className="row">

            <div className="col-md-3">
              <h2 className="fw-bold">500+</h2>
              <p>Happy Customers</p>
            </div>

            <div className="col-md-3">
              <h2 className="fw-bold">150+</h2>
              <p>Service Experts</p>
            </div>

            <div className="col-md-3">
              <h2 className="fw-bold">1000+</h2>
              <p>Completed Jobs</p>
            </div>

            <div className="col-md-3">
              <h2 className="fw-bold">4.8⭐</h2>
              <p>Customer Rating</p>
            </div>

          </div>

        </div>


        <div className="text-center mb-5">

          <h2 className="fw-bold">Our Services</h2>

          <p className="text-muted">
            Plumbing • Electrical Repairs • Carpentry • AC Repair • Cleaning
          </p>

        </div>

      </div>

    </div>
  );
}
