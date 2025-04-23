import CommercialCarCard from "./CommercialCarCard";
import Footer from "../Pages/Footer";
import "../Styles/Pricing.css";
import tariffImage from "/images/pricing.png"; 
import logoImage from "/images/logo.png"; 
import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <>
      <header className="pricing-header">
        <Link to="/">
          {" "}
          {/* הקישור חזרה לאתר */}
          <img src={logoImage} alt="לוגו החברה" className="logo-image" />
        </Link>
      </header>
      <div className="pricing-page">
        <div className="pricing-header">
          <div className="pricing-title">
            <h1>תעריפים</h1>
            <div className="animated-line"></div>
          </div>
          <img src={tariffImage} alt="תעריפים" className="tariff-image" />
        </div>
      </div>

      <div className="pricing-container">
        <CommercialCarCard
          carImage={"/images/car.png"}
          hourlyRate={"12.9  ₪"}
          dailyRate={"180  ₪"}
          seats={"5"}
          footerColor={"#00e079"}
          carName={"רכב קטן"}
        ></CommercialCarCard>
        <CommercialCarCard
          carImage={"/images/car2.png"}
          hourlyRate={"19.9  ₪"}
          dailyRate={"230  ₪"}
          seats={"7"}
          footerColor={"#f50057"}
          carName={"רכב 7 מקומות"}
        ></CommercialCarCard>
        <CommercialCarCard
          carImage={"/images/car3.png"}
          hourlyRate={"12.9  ₪"}
          dailyRate={"180  ₪"}
          seats={"5"}
          footerColor={"#2be1ef"}
          carName={"רכב משפחתי"}
        ></CommercialCarCard>
        <CommercialCarCard
          carImage={"/images/autocar.png"}
          hourlyRate={"12.9  ₪"}
          dailyRate={"180  ₪"}
          seats={"5"}
          footerColor={"#ffe000"}
          carName={"רכב חשמלי"}
        ></CommercialCarCard>
      </div>
      <Footer></Footer>
    </>
  );
}
