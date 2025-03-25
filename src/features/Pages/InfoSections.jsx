import "../Styles/InfoSections.css";

export default function InfoSections() {
  return (
    <div className="infoContainer">
      <div className="halfgreen">
        <h2 className="infoTtile1">אנחנו כאן כאן ו...</h2>
        <p className="infoSubTitle1">
          בטוח יש לנו רכב שיתופי קרוב אליך רוצה לדעת איפה?
        </p>
        <button className="infoButton1">איפה עוד?</button>
      </div>
      <div className="halfBlue">
        <h2 className="infoTtile2">נעים מאוד WHEELSHARE</h2>
        <p className="infoSubTitle2">מהו רכב שיתופי? ומהם היתרונות שלנו?</p>
        <button className="infoButton2">קרא עוד</button>
      </div>
    </div>
  );
}
