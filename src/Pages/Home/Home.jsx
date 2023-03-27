import React from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const donateFoodHandler = () => {
    navigate("/food-donors");
  };

  const donorSignUpNavigation = () => {
    localStorage.setItem("role", "donor");
    navigate("/signup");
  };

  const charitySignUpNavigation = () => {
    localStorage.setItem("role", "charity");
    navigate("/signup");
  };

  const adminSignInNavigation = () => {
    navigate("/admin");
  };
  return (
    <div className="home">
      <section className="intro">
        <span>We make it easy to</span>
        <h1>Find Secure & Deliver Food</h1>
        <p>
          We are a non-profit enabling the exchange of excess food from the food
          industry to those who need it most
        </p>
        <button onClick={donateFoodHandler}>Donate food</button>
      </section>
      <section className="how">
        <h1>Waste food Management</h1>
        <div className="three-grid">
          <div>
            {/* <img /> */}
            <div className="description">
              <span onClick={donorSignUpNavigation} className="heading">
                Donor
              </span>
              {/* <p>
                Farms, restaurants, cafeterias, hotels, stadiums, and grocery
                stores post excess food in under a minute on the Waste No Food
                app.
              </p> */}
            </div>
          </div>
          <div>
            {/* <img /> */}
            <div className="description">
              <span onClick={charitySignUpNavigation} className="heading">
                Charity
              </span>
              {/* <p>
                Pre-vetted charities immediately get notified about food
                donations and can claim any donations they can use to serve
                hungry clients.
              </p> */}
            </div>
          </div>
          <div>
            {/* <img /> */}
            <div className="description">
              <span onClick={adminSignInNavigation} className="heading">
                Admin
              </span>
              {/* <p>
                The charity, or a network of volunteers, picks up the food and
                serves it to hungry people.
              </p> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
