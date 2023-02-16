import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
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
    signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
      .then((cred) => {
        console.log(cred);
      })
      .catch((err) => {
        console.log(err);
      });
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
