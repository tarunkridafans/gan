import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { toast } from "react-toastify";

function Admin() {
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
    console.log("form");
    signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
      .then((cred) => {
        console.log(cred);
        toast.success("Logged In Successully");
        navigate("/adminDashboard");
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
        <button onClick={loginHandler}>Login</button>
      </div>
    </div>
  );
}

export default Admin;
