import { memo } from "react";
import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="row">
        <div className="col-xl-3 about-section">
          <h5>About Us</h5>
          <p>
            E-Learning is your online resource for high-quality courses to
            improve your skills and knowledge.
          </p>
        </div>
        <div className="col-xl-6 contact-section">
          <h5>Contact Us</h5>
          <p>Email: support@elearning.com</p>
          <p>Phone: +123-456-7890</p>
          <p>Address: 123 E-Learning St, Knowledge City, World</p>
        </div>
        <div className="col-xl-3 social-section">
          <h5>Follow Us</h5>
          <div className="social-icons">
            <a href="https://facebook.com" className="social-icon facebook">
              Facebook
            </a>
            <a href="https://twitter.com" className="social-icon twitter">
              Twitter
            </a>
            <a href="https://instagram.com" className="social-icon instagram">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} E-Learning. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default memo(Footer);
