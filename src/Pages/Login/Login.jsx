import React, { useState } from "react";
import "./Login.scss";

function Login() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const onChangeHandler = (e) => {
    const latest = {};
    latest[e.target.name] = e.target.value;
    setLoginForm((prev) => {
      return { ...prev, ...latest };
    });
  };

  const loginHandler = () => {
    console.log(loginForm);
  };
  return (
    <div className="login">
      <div className="form">
        <div>
          <span>Email</span>
          <input
            name="email"
            value={loginForm.email}
            onChange={onChangeHandler}
            type="text"
          />
        </div>
        <div>
          <span>Password</span>
          <input
            name="password"
            value={loginForm.password}
            onChange={onChangeHandler}
            type="password"
          />
        </div>
        <a>Forgot Password?</a>
        <button onClick={loginHandler}>Login</button>
      </div>
    </div>
  );
}

export default Login;
