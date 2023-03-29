import React, { useEffect } from "react";
import "./Header3.scss";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

function Header3({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const logOutHandler = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="header3">
      <span className="user-name">{`Hiii ${user?.email}`}</span>
      <button onClick={logOutHandler}>Logout</button>
    </div>
  );
}

export default Header3;
