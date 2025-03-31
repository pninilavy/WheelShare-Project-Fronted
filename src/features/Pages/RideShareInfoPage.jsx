import "../Styles/RideShareInfoPage.css";
import logoImage from "../../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
export default function RideShareInfoAnimated() {
  const navigate=useNavigate()
  const handlesubmit=()=>{
    navigate("/SignUp");
  }
  return (
    <>
      <header className="pricing-header">
        <Link to="/">
          {" "}
          <img src={logoImage} alt="לוגו החברה" className="logo-image" />
        </Link>
      </header>
      <div className="infoAnimatedContainer">
        <div className="section intro fade-in">
          <h1>מה מיוחד ב־Wheelshare?</h1>
          <p>
            Wheelshare מציעה שירות השכרת רכבים שיתופיים שמאפשר לכם לא רק לשכור
            רכב – אלא גם לחלוק את הדרך. המערכת שלנו מתאימה בין נהגים לנוסעים על
            בסיס מיקום, מסלול וזמנים דומים, ובכך מציעה פתרון חסכוני, סביבתי
            ונוח.
          </p>
        </div>

        <div className="section highlight slide-up">
          <div className="circle-deco"></div>
          <h2>הטכנולוגיה שלנו</h2>
          <p>
            בעזרת אלגוריתם חכם, אנו מזהים משתמשים שנוסעים במסלולים דומים ומציעים
            התאמה לנסיעה שיתופית. המערכת מתעדכנת בזמן אמת, מאפשרת תקשורת בין
            המשתמשים, ודואגת שתחלקו לא רק את הנסיעה – אלא גם את העלויות.
          </p>
        </div>

        <div className="section emphasize scale-in">
          <h2>רכב פרטי. תחושת חופש. מחיר של תחבורה ציבורית.</h2>
          <p>
            השירות מתאים לכל מי שמחפש חווית נסיעה חכמה – בין אם אתם בדרך לעבודה,
            לים, או לסוף השבוע בצפון. אתם נהנים מהחופש של רכב פרטי, בלי לשלם
            עליו לבד.
          </p>
        </div>

        <div className="section cta fade-in">
          <h2>רוצים להצטרף?</h2>
          <p>
            השירות שלנו פתוח כבר עכשיו להשכרות של עד 24 שעות. בהמשך נפתח גם
            אפשרויות לנסיעות ארוכות יותר, תחנות נוספות, ומסלולים אישיים.
          </p>
          <button className="mainButton" onClick={handlesubmit}>התחילו עכשיו</button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
