import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setshowSignIn } from "../Pages/SignInSlice"; 
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
const SignInAndLogOut = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.showSignIn.showSignIn);
    const navigate=useNavigate();
  const handleToggleAuth = () => {
    let flag=false;
    if(localStorage.getItem("token")==null)
    {
        flag=true;
        navigate("/SignIn");
        
    }
    else{
    localStorage.removeItem("token")  
    dispatch(setshowSignIn(flag)); 
  
    }
  };

  return (
    <div className="auth-buttons">
      <button onClick={handleToggleAuth} className="auth-button">
        {isSignedIn ? (
          <>
            <FaSignOutAlt className="auth-icon" /> התנתקות
          </>
        ) : (
          <>
            <FaSignInAlt className="auth-icon" /> התחברות
          </>
        )}
      </button>
    </div>
  );
};

export default SignInAndLogOut;
