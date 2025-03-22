import React from "react";
import buttonImage1 from "../../../images/button1.png";
import buttonImage2 from "../../../images/button2.png";
import "../Styles/OurButtons.css";
import SignUp from "../User/SignUp";
import OrderRide from "../Orders/OrderRide"

export default function OurButtons({ onButtonClick }) {
  return (
    <>
      {/* כפתורים עם תמונות */}
      <img
        src={buttonImage1}
        className="button-image left"
        alt="button 1"
        onClick={() => onButtonClick(<SignUp />)}
      />
      <img
        src={buttonImage2}
        className="button-image left"
        alt="button 2"
        onClick={() => onButtonClick(<OrderRide/>)}
      />
    </>
  );
}
