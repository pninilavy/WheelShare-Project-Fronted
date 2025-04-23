import React from "react";
import { Link } from "react-router-dom";
import { FaShekelSign, FaInfoCircle, FaHeadset, FaUser } from "react-icons/fa";
export default function NavBar() {
  return (
    <>
      <div className="sidebar">
        <Link to="/pricing" className="sidebar-item">
          <FaShekelSign className="icon" />
          <span>מחירון</span>
        </Link>

        <Link to="/guide" className="sidebar-item">
          <FaInfoCircle className="icon" />
          <span>קצת עלינו</span>
        </Link>

        <Link to="/contact" className="sidebar-item">
          <FaHeadset className="icon" />
          <span>צור קשר</span>
        </Link>
      </div>
    </>
  );
}
