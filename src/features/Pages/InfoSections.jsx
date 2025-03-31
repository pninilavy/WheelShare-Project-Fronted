import "../Styles/InfoSections.css";
import { useNavigate } from "react-router-dom";
export default function InfoSections() {
  const navigate = useNavigate();
  const handlesubmit = () => {
    navigate("/guide");
  };
   const handlesubmit1 = () => {
     navigate("/pricing");
   };
  return (
    <div className="infoContainer">
      <div className="halfgreen">
        <h2 className="infoTtile1">אנחנו כאן כאן ו...</h2>
        <p className="infoSubTitle1">
          בטוח יש לנו רכב שיתופי קרוב אליך רוצה לדעת מה המחיר?
        </p>
        <button className="infoButton1" onClick={handlesubmit1}>מה המחיר?</button>
      </div>
      <div className="halfBlue">
        <h2 className="infoTtile2">נעים מאוד WHEELSHARE</h2>
        <p className="infoSubTitle2">מהו רכב שיתופי? ומהם היתרונות שלנו?</p>
        <button className="infoButton2" onClick={handlesubmit}>
          קרא עוד
        </button>
      </div>
    </div>
  );
}
