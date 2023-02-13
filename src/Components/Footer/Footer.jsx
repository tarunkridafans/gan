import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-top">
        <div>Send an Email</div>
        <div>Twitter</div>
        <div>Facebook</div>
      </div>
      <div className="footer-bottom">
        <div>Waste No feed</div>
        <div>Instagram feed</div>
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
    </div>
  );
}

export default Footer;