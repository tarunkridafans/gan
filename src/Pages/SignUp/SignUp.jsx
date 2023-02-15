import React, { useState } from "react";
import "./SignUp.scss";
function SignUp() {
  const [signupForm, setSignupForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const latest = {};
    latest[e.target.name] = e.target.value;
    setSignupForm((prev) => {
      return { ...prev, ...latest };
    });
  };

  const signupHandler = () => {
    console.log(signupForm);
  };
  return (
    <div className="signup">
      <div className="form">
        <div>
          <span>Name</span>
          <input name="name" onChange={onChangeHandler} type="text" />
        </div>
        <div>
          <span>Phone</span>
          <input name="phone" onChange={onChangeHandler} type="text" />
        </div>
        <div>
          <span>Email</span>
          <input name="email" onChange={onChangeHandler} type="text" />
        </div>
        <div>
          <span>Password</span>
          <input name="password" onChange={onChangeHandler} type="password" />
        </div>
        <div>
          <span>City</span>
          <input name="city" onChange={onChangeHandler} type="text" />
        </div>
        <div>
          <span>State</span>
          <input name="state" onChange={onChangeHandler} type="text" />
        </div>
        <div>
          <span>Zip Code</span>
          <input name="zip" onChange={onChangeHandler} type="text" />
        </div>
        <div>
          <span>Type of Donor</span>
          <select name="donor" onChange={onChangeHandler}>
            <option>Farm</option>
            <option>Grocery</option>
            <option>Restaurant</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <span>Cuisine </span>
          <select name="cuisine" onChange={onChangeHandler}>
            <option>American</option>
            <option>Bakery</option>
            <option>Coffe Shop</option>
            <option>Japaneese</option>
            <option>Mexican</option>
            <option>French</option>
            <option>Other</option>
          </select>
        </div>
        <div className="signup-button">
          <button onClick={signupHandler}>SignUp</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
