import React from "react";
import "./FoodDonors.scss";
import { Link } from "react-router-dom";
function FoodDonors() {
  return (
    <div className="food-donor">
      <section class="intro">
        <span>IT’S EASY TO BE A FOOD DONOR</span>
        <h1>Help Feed People with Your Excess Food</h1>
        <p>
          Are you restaurant, grocery store, farm, cafeteria or caterer
          interested in signing up for the Waste No Food program? It makes sense
          as donating excess food to legitimate charities is a quick, efficient
          and tax-deductible way to make an impact on your community.
        </p>

        <p className="highlight">
          The Bill Emerson Good Samaritan Act protects food donors from being
          liable for the quality of the food. Here’s how it works: as a food
          donor you can post the amount of excess food you have available and
          the time required to pick the food up. Then organizations can request
          the food. Afterwards, the organization will be held responsible for
          picking up the food in a seamless and efficient manner.
        </p>

        <p>Interested in joining? Simply Click the sign up button below.</p>
        <div className="buttons">
          <button className="signin">
            <Link to="/login">DONOR SIGNIN</Link>
          </button>
          <button className="signup">
            {" "}
            <Link to="/signup">DONOR SIGNUP</Link>
          </button>
        </div>
      </section>
    </div>
  );
}

export default FoodDonors;
