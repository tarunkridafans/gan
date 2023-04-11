import React, { useState, useEffect, useRef } from "react";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

function Login() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [role, setRole] = useState("");
  const user = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    let role = localStorage.getItem("role");
    if (!role) {
      navigate("/");
    }
    setRole(role);
  }, []);

  const onChangeHandler = (e) => {
    const latest = {};
    latest[e.target.name] = e.target.value;
    setLoginForm((prev) => {
      return { ...prev, ...latest };
    });
  };

  const isValid = async (email) => {
    const colRef = collection(db, "users");
    const q = query(colRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      user.current = { ...doc.data(), id: doc.id };
    });

    await updateProfile(auth.currentUser, {
      displayName: user.current?.["name"],
      phoneNumber: user.current?.["phone"],
    });
    return user.current.role == role && !user.blocked;
  };

  const loginHandler = () => {
    signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
      .then((cred) => {
        isValid(cred.user.email)
          .then((flag) => {
            if (!flag) {
              toast.error("Invalid Credentials");
              return;
            }
            toast.success("Logged In Successully");
            const role = localStorage.getItem("role");
            if (role == "donor") {
              navigate("/foodDonorDashboard");
            } else if (role == "charity") {
              navigate("/charitiesDashboard");
            } else {
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid Credentials");
        setLoginForm({ email: "", password: "" });
      });
  };
  return (
    <div className="login">
      <div className="header">
        <span>Home / </span>
        {role?.charAt(0).toLocaleUpperCase() + role?.substring(1)} Login Page
      </div>
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
        <Link to="/forgot">Forgot Password?</Link>
        <span className="account">
          Don't have an account? <Link to="/signup">Create one now</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
