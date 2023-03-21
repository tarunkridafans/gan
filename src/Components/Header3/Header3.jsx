import React, { useEffect } from "react";
import "./Header3.scss";
import { useNavigate } from "react-router-dom";

function Header3({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="header3">
      <span className="user-name">{`Hiii ${user?.email}`}</span>
    </div>
  );
}

export default Header3;
