import "./Header.scss";
function Header() {
  return (
    <div className="header">
      <div className="upper-header">
        <span className="heading">Diverting excess food to the hungry people since 2011</span>
        <ul>
          <li>
            <span>IOS App</span>
          </li>
          <li>
            <span>Android App </span>
          </li>
          <li>
            <span>Admin</span>
          </li>
          <li>
            <span>Contact Us</span>
          </li>
        </ul>
      </div>
      <div className="lower-header">
        <ul>
          <li>About Us</li>
          <li>Food Donors</li>
          <li>Charities</li>
          <li>Volunteers</li>
          <li>Admins</li>
          <li>
            <button>DONATE MONEY</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
