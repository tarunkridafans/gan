import React from "react";
import "./Charities.scss";
import { Link } from "react-router-dom";
function Charities() {
  return (
    <div className="charities">
      <section class="intro">
        <span>CHARITIES BRIDGE THE GAP</span>
        <h1>Become a Waste No Food Hero</h1>
        <p>
          Charities on the Waste No Food app receive high-quality meals from
          restaurants, convention centers, hotels, stadiums, and grocery stores
          in their communities. Charity users receive push notifications on the
          Waste No Food app whenever food in their area becomes available. They
          claim food only if they’re able to serve it to their clients. They
          then pick it up or assign a volunteer food runner to pick it up. The
          Waste No Food app helps charities prioritize volunteer time and reduce
          money on food budgets: they can divert savings to other programmatic
          expenses.
        </p>
        <p>Interested in joining? Simply Click the sign up button below.</p>
        <div className="buttons">
          <button className="signin">
            <Link to="/login">CHARITIES SIGNIN</Link>
          </button>
          <button className="signup">
            <Link to="/signup">CHARITIES SIGNUP</Link>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Charities;
