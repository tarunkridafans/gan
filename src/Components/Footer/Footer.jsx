import "./Footer.scss";
import { FiMail } from "react-icons/fi";
import { FaTwitter, FaFacebookSquare } from "react-icons/fa";
function Footer() {
  return (
    <div className="footer">
      <div className="footer-top">
        <div>
          <p>
            {" "}
            <FiMail /> Send an Email
          </p>
          <span>info@wastenofood.org</span>
        </div>
        <div>
          <p>
            {" "}
            <FaTwitter /> Twitter
          </p>
          <span>https://twitter.com/wastenofood</span>
        </div>
        <div>
          <p>
            {" "}
            <FaFacebookSquare /> Facebook
          </p>
          <span>https://facebook.com/WasteNoFood</span>
        </div>
      </div>
      <div className="footer-bottom">
        <div>
          <p> Waste No feed</p>
        </div>
        <div>
          <p>Instagram feed</p>
        </div>
        <div>
          <p>Quick Links</p>
          <ul>
            <li>About</li>
            <li>Contact</li>
            <li>FAQ's</li>
            <li>Our Team</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
      <p className="copyright">
        Copyright © 2021, Waste No Food. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
