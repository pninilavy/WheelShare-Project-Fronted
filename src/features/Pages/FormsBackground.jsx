
import { useNavigate } from "react-router-dom"; 
import "../Styles/FormsBackground.css"; 

const imageUrl = "/images/longBuildings.png"; 

export default function FormsBackground() {
  const navigate = useNavigate(); 


  const handleBackToHome = () => {
    navigate("/Background"); 
  };
  return (
    <div className="Formsbackground">
      <div className="user-alert">
        לקוח יקר, שים לב! הנך נמצא כעת במערכת ההזמנות והאיזור האישי שלך
        WHEELSHARE ב
      </div>
      <button className="back-button" onClick={handleBackToHome}>
        חזרה לאתר
      </button>
      <img src={imageUrl} alt="Overlay" className="background-image" />
    </div>
  );
}
