import React from "react";
import "./Home.scss";
function Home() {
  return (
    <div class="home">
      <section class="intro">
        <span>We make it easy to</span>
        <h1>Find Secure & Deliver Food</h1>
        <p>
          We are a non-profit enabling the exchange of excess food from the food
          industry to those who need it most
        </p>
        <button>Donate food</button>
      </section>
      <section className="how">
        <h1>How it Works</h1>
        <div className="three-grid">
          <div>
            <img />
            <div className="description">
              <h2>Food is Donated</h2>
              <p>
                Farms, restaurants, cafeterias, hotels, stadiums, and grocery
                stores post excess food in under a minute on the Waste No Food
                app.
              </p>
            </div>
          </div>
          <div>
            <img />
            <div className="description">
              <h2>Food is Secured</h2>
              <p>
                Pre-vetted charities immediately get notified about food
                donations and can claim any donations they can use to serve
                hungry clients.
              </p>
            </div>
          </div>
          <div>
            <img />
            <div className="description">
              <h2>Food Is Picked Up</h2>
              <p>
                The charity, or a network of volunteers, picks up the food and
                serves it to hungry people.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
