import React, { useState, useEffect } from "react";
import { FaShekelSign, FaInfoCircle, FaHeadset, FaUser } from "react-icons/fa";
import NavBar from "./NavBar";
import "../Styles/Background.css";
import logoImage from "../../../images/logo.png";

import SignUp from "../User/SignUp";
import Features from "./Features";
import OurButtons from "./OurButtons";

export default function Background() {
  const [carPosition, setCarPosition] = useState("100vw");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarPosition((prevPosition) => {
        const currentPosition = parseInt(prevPosition);
        if (currentPosition > 50) {
          return `${currentPosition - 5}vw`;
        } else {
          clearInterval(interval);
          return prevPosition;
        }
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
    setShowAll(false);
  };

  return (
    <>
      {showAll ? (
        <>
          <div className="background">
            <div className="green-side"></div>
            <div className="white-side">
              <NavBar></NavBar>
            </div>
            <img
              src="../../../images/buildings.png"
              className="buildings"
              alt="buildings"
            />
            <img src={logoImage} className="logo" alt="logo" />
            <img
              src="../../../images/car.png"
              className="car"
              style={{ left: carPosition }}
              alt="car"
            />

            {/* כותרת עם שם וסלוגן */}
            <div className="header">
              <h1 className="title">WHEELSHARE</h1>
              <h2 className="subtitle">מגלגלים שינוי יחד</h2>
              <div className="underline"></div>
            </div>
            <OurButtons onButtonClick={handleComponentChange} />
          </div>
          <Features></Features>
        </>
      ) : (
        <div className="component-container">
          <div className="center-container">
            {/* הודעת אזהרה למשתמש */}
            <div className="user-alert">
              לקוח יקר, שים לב! הנך נמצא כעת במערכת ההזמנות והאיזור האישי שלך
              WHEELSHARE ב
            </div>
            {selectedComponent}
            <button className="back-button" onClick={() => setShowAll(true)}>
              חזרה לאתר
            </button>
          </div>
        </div>
      )}
    </>
  );
}
