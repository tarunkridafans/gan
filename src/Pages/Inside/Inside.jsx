import React from "react";
import "./Inside.scss";
function Inside({ user }) {
  console.log("inside", user);
  return <div>Hey {user.email}!</div>;
}

export default Inside;
