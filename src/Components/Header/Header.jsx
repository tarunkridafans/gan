import "./Header.scss";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="header">
      <div className="upper-header">
        <span className="heading">
          Diverting excess food to the hungry people since 2011
        </span>
        <ul>
          {/* <li>
            <span>IOS App</span>
          </li>
          <li>
            <span>Android App </span>
          </li> */}
          <li>
            <span>Admin</span>
          </li>
          <li>
            <span>Contact Us</span>
          </li>
        </ul>
      </div>
      <div className="lower-header">
        <h2>
          <Link to="/">Waste No food</Link>
        </h2>
        <ul>
          {/* <li>About Us</li> */}
          <li>
            <Link to="/food-donors">Food Donors</Link>
          </li>
          <li>
            <Link to="/charities">Charities</Link>
          </li>
          {/* <li>Volunteers</li> */}
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          {/* <li>
            <button>DONATE MONEY</button>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default Header;
