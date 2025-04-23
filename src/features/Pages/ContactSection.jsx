import React from "react";
import "../Styles/ContactSection.css";
import Footer from "./Footer";
import logoImage from "/images/logo.png"; 
import { Link, useNavigate } from "react-router-dom";
function ContactSection() {
  const navigate=useNavigate();
  const handlesubmit=()=>{
    navigate("/guide");
  }
  return (
    <>
      <header className="pricing-header">
        <Link to="/">
          {" "}
          <img src={logoImage} alt="לוגו החברה" className="logo-image" />
        </Link>
      </header>
      <div className="contact-section-container">
        <div className="city-illustration" />
        <div className="contact-card">
          <h2>צור קשר</h2>
          <p className="contact-text">
            לקוחות יקרים, על מנת לחסוך לכם זמן יקר בהמתנה, ריכזנו עשרות שאלות
            נפוצות ותשובות מפורטות. תוכלו לעיין בהן כמעט בטוח שתמצאו שם גם תשובה
            לשאלתכם.
          </p>
          <button className="contact-button" onClick={handlesubmit}>כל מה שצריך לדעת</button>
          <p className="contact-footer">
            אם בכל זאת נתקלתם בבעיה – תמיד אפשר ליצור קשר בדרכים הבאות:
            <br />
            <strong>*2145</strong> מכל טלפון
            <br />
            <strong>wheelsharegroup@gmail.com</strong>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactSection;
