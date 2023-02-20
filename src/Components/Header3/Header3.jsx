import React, { useEffect } from "react";
import "./Header3.scss";
function Header3({ user }) {
  console.log("user", user);
  useEffect(() => {});
  return (
    <div className="header3">
      <span className="user-name">{`Hi ${user.email}`}</span>
    </div>
  );
}

export default Header3;
