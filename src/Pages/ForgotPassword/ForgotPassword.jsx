import React, { useState } from "react";
import "./ForgotPassword.scss";
import { auth } from "../../firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";
import { MdCheck } from "react-icons/md";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [isSuccessful, setIsSuccessful] = useState(false);

  const onChangeHandler = (e) => {
    const latest = {};
    latest[e.target.name] = e.target.value;
    setLoginForm((prev) => {
      return { ...prev, ...latest };
    });
  };

  const forgotPasswordHandler = async () => {
    try {
      let res = await sendPasswordResetEmail(auth, loginForm.email);
      setIsSuccessful(true);
      console.log("res", res);
    } catch (error) {
      toast.error("Email not registered");
      console.error(error);
    }
  };

  const goBackHandler = () => {
    setIsSuccessful(false);
  };
  return (
    <div className="forgot">
      <div className="header">
        <span>Home / </span>
        Forgot Password
      </div>
      <div className="form">
        {!isSuccessful && (
          <>
            <div>
              <span>Email</span>
              <input
                name="email"
                value={loginForm.email}
                onChange={onChangeHandler}
                type="text"
              />
            </div>
            <button onClick={forgotPasswordHandler}>Confirm Mail</button>
          </>
        )}
        {isSuccessful && (
          <div className="success">
            <div className="box">
              <MdCheck />
              <p>Mail Sent!</p>
            </div>
            <button onClick={goBackHandler}>Go back</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
