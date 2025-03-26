import React from "react";
import "../Styles/FormsBackground.css";

const imageUrl = "../../../images/longBuildings.png";

export default function FormsBackground() {
  return (
    <div className="Formsbackground">
      <img src={imageUrl} alt="Overlay" className="background-image" />
    </div>
  );
}