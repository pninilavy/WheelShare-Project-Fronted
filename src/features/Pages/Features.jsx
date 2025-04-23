import React from "react";
import "../Styles/Features.css";

const Card = ({ image, title, text }) => {
  return (
    <div className="card">
      <img src={image} alt="card" className="image" />
      <h3 className="card-title">{title}</h3>
      <p className="text">{text}</p>
    </div>
  );
};

const Features = () => {
  return (
    <>
      <div className="container">
        <div className="underlineFeature"></div>
        <h1>הרבה יותר פשוט וקל</h1>

        <div className="card-container">
          <Card
            image="/images/featureWheel.png"
            title="ונוסעים משתלם יותר"
            text="איך נוסעים? פותחים את הרכב באמצעות קוד בקודנית המותקנת ברכב או באפליקציה"
          />
        </div>

        <div className="card-container">
          <Card
            image="/images/featureComputer.png"
            title="מזמינים רכב קרוב"
            text="איך מזמינים? בקלות ובמהירות דרך מערכת חכמה באתר, באפליקציה או בטלפון"
          />
        </div>
        <div className="card-container">
          <Card
            image="/images/featureCar.png"
            title="מצטרפים לשירות"
            text="איך מצטרפים? תהליך הרשמה פשוט וקל במגוון ערוצים לבחירתכם: כאן באתר, באפליקציה או בטלפון"
          />
        </div>
      </div>
    </>
  );
};

export default Features;
