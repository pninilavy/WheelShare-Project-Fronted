import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; // אייקונים לפייסבוק, טוויטר ואינסטגרם
import "../Styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-left">
        <p>&copy; 2025 WHEELSHARE</p>
      </div>
      <div className="footer-center">
        <div className="footer-links">
          <a href="#" className="footer-link">
            בית
          </a>
          <a href="#" className="footer-link">
            אודות
          </a>
          <a href="#" className="footer-link">
            צור קשר
          </a>
        </div>
        <div className="footer-social-icons">
          <a href="#" className="social-icon">
            <FaFacebookF />
          </a>
          <a href="#" className="social-icon">
            <FaTwitter />
          </a>
          <a href="#" className="social-icon">
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
