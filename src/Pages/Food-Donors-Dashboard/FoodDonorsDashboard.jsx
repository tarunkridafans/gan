import React from "react";
import "./FoodDonorsDashboard.scss";
import { useState } from "react";
function FoodDonorsDashboard() {
  const [donateForm, setDonateForm] = useState({
    donationName: "food",
    type_of_food: "",
    oldFood: "",
    address: "",
    specialNote: "",
  });

  const onChangeHandler = (e) => {
    const latest = {};
    latest[e.target.name] = e.target.value;
    setDonateForm((prev) => {
      return { ...prev, ...latest };
    });
  };

  const donateHandler = () => {
    console.log("form data", donateForm);

    setDonateForm();
  };
  return (
    <div className="donors-page">
      <div className="form">
        <h2>Donate Now</h2>

        <div className="field">
          <label>Donation Name </label>
          <select name="donationName" onChange={onChangeHandler}>
            <option value="food">Food</option>
          </select>
        </div>
        <div className="radio-buttons">
          <input
            type="radio"
            id="non-veg"
            name="type_of_food"
            value="non-veg"
            onChange={onChangeHandler}
          />
          <label for="non-veg">Non-veg food</label>
          <input
            type="radio"
            id="veg"
            name="type_of_food"
            value="veg"
            onChange={onChangeHandler}
          />
          <label for="veg">Veg food</label>
          <input
            type="radio"
            id="both"
            name="type_of_food"
            value="both"
            onChange={onChangeHandler}
          />
          <label for="both">Both</label>
        </div>
        <div className="field">
          <label>How old food is? </label>
          <input type="text" name="oldFood" onChange={onChangeHandler} />
        </div>
        <div className="field">
          <label>Donation collection Address </label>
          <input type="text" name="address" onChange={onChangeHandler} />
        </div>
        <div className="field">
          <label>Special Note</label>
          <textarea
            name="specialNote"
            rows="4"
            cols="50"
            onChange={onChangeHandler}
          ></textarea>
        </div>
        <button className="donate" onClick={donateHandler}>
          Donate Happiness
        </button>
      </div>
      <div className="view">
        <table>
          <tr>
            <th>#</th>
            <th>Donation Name</th>
            <th>Donation Pickup Location</th>
            <th>Special Note</th>
            <th>Donation Date</th>
            <th>Status</th>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default FoodDonorsDashboard;
