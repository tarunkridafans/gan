import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { toast } from "react-toastify";

function Login() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();

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
        toast.success("Logged In Successully");
        navigate("/inside");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid Credentials");
        setLoginForm({ email: "", password: "" });
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
