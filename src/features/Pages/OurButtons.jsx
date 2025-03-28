import React, { useState } from "react";
import buttonImage1 from "../../../images/button1.png";
import buttonImage2 from "../../../images/button2.png";
import "../Styles/OurButtons.css";
import SignUp from "../User/SignUp";
import SignIn from "../User/SignIn"; 
import OrderRide from "../Orders/OrderRide"
import { useNavigate } from "react-router-dom";


export default function OurButtons() {
  const [showMessage, setShowMessage] = useState(false); // סטייט להחזקת מצב ההודעה
  const navigate=useNavigate();
  
    const handleOrderRide = () => {
      navigate("/OrderRide");
      setShowMessage(false); 
    };
    const handleSignUp = () => {
        navigate("/SignUp");
         setShowMessage(false); 
    };
    const handleSignIn=()=>{
      navigate("/SignIn");
      setShowMessage(false); 
    }
  const checkAbility = () => {
    if (localStorage.getItem("token") == null) {
      setShowMessage(true);
    } else {
      handleOrderRide();
    }
  };
  return (
    <>
      {/* כפתורים עם תמונות */}
      <img
        src={buttonImage1}
        className="button-image left"
        alt="button 1"
        onClick={handleSignUp}
      />
      <img
        src={buttonImage2}
        className="button-image left"
        alt="button 2"
        onClick={checkAbility}
      />

      {/* הודעה עם אפשרות להתחברות/הרשמה */}
      {showMessage && (
        <div className="alert-message">
          <div className="alert-content">
            <p>אינך מחובר למערכת, אנא בחר אפשרות:</p>
            <div className="button-options">
              <button
                className="action-button special"
                onClick={handleSignUp}
              >
                הרשמה
              </button>
              <button
                className="action-button special"
                onClick={handleSignIn}
              >
                התחברות
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
