import React from "react";
import "../Styles/CommercialCarCard.css";

const CommercialCarCard = ({
  carImage,
  cardColor ,
  hourlyRate ,
  dailyRate,
  seats ,
  footerColor,
  carName ,
}) => {
  return (
    <div className="car-card-container" style={{ backgroundColor: cardColor }}>
      <div className="car-card-content">
        <div className="right-section">
          {carImage ? (
            <img className="car-image" src={carImage} alt="רכב מסחרי" />
          ) : (
            <div className="car-image-placeholder">כאן תכניס תמונה</div>
          )}
        </div>

        <div className="left-section">
          <div className="fuel-icon">
            <img
              src="../../../images/gas.png"
              alt="דלק עלינו"
              className="icon"
            />
            <div className="fuel-text">
              <div>הדלק</div>
              <div>עלינו</div>
            </div>
          </div>

          <div className="details">
            <div className="detail-item">
              <img src="../../../images/clock.png" alt="שעה" className="icon" />
              <span>{hourlyRate} לשעה + 1.8 ₪ לק"מ</span>
            </div>
            <div className="detail-item">
              <img
                src="../../../images/calender.png"
                alt="יום"
                className="icon"
              />
              <span>{dailyRate} ליום + 1.4 ₪ לק"מ</span>
            </div>
            <div className="detail-item">
              <img
                src="../../../images/iconcar.png"
                alt="מזוודות"
                className="icon"
              />
              <span>אוטו | {seats} מושבים | 5 מזוודות</span>
            </div>
            <div className="detail-item">
              <img src="../../../images/waze.png" alt="Waze" className="icon" />
              <span>מערכת WAZE מותקנת ברכב</span>
            </div>
          </div>

          <div className="note">
            *החברה אינה אחראית לתפעול ה־WAZE <br />
            ואינה מתחייבת לתקינותו בכל עת
          </div>
        </div>
      </div>

      <div className="car-card-footer" style={{ backgroundColor: footerColor }}>
        <span className="car-type-bold">רכב מסחרי</span> - {carName} או דומה
      </div>
    </div>
  );
};

export default CommercialCarCard;
