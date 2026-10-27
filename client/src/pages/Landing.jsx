import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <main className="landing">
      <section className="hero">
        <p className="hero-label">SMARTER CITIES START HERE</p>

        <h1>
          Making Our Cities
          <br />
          Better, Together.
        </h1>

        <p className="hero-description">
          Report potholes, broken streetlights, water leaks, and
          other public infrastructure issues in your area.
          Help make your community safer and better.
        </p>

        <div className="hero-actions">
          <Link to="/report" className="primary-button">
            Report an Issue
          </Link>

          <Link to="/reports" className="secondary-button">
            View Reports
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Landing;