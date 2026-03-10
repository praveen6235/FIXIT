import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold text-warning">FixIt</h4>

            <p className="text-light">
              FixIt connects you with trusted plumbers, electricians, carpenters
              and home service professionals. Book services easily and get work
              done at your doorstep.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Our Services</h5>

            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/services/plumbing">Plumbing</Link>
              </li>

              <li>
                <Link to="/services/electrician">Electrician</Link>
              </li>

              <li>
                <Link to="/services/carpenter">Carpenter</Link>
              </li>

              <li>
                <Link to="/services/cleaning">Cleaning</Link>
              </li>

              <li>
                <Link to="/services/painting">Painting</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Contact</h5>

            <p>📧 praveenbollam9550@gmail.com</p>
            <p>📞 +91 93914 52521</p>
            <p>📍 India</p>
          </div>
        </div>

        <hr className="border-light" />

        <div className="text-center">
          <p className="mb-0">
            © 2026 <span className="text-warning">FixIt</span>. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

