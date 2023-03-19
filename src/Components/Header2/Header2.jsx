import React from "react";
import "./Header2.scss";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

function Header2() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location["pathname"] === "/admin";
  console.log("isAdminPage", isAdminPage);
  return (
    <div className="header2">
      <div className="left-header">
        <h3>
          <Link to="/">Waste No food</Link>
        </h3>
        <p>Diverting Excess food to hungry people</p>
      </div>

      {!isAdminPage && (
        <div className="buttons">
          <button>
            <Link to="/login">LogIn</Link>
          </button>
          <button>
            <Link to="/signup">SignUp</Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default Header2;
