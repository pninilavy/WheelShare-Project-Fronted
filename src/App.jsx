

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import SignUp from "./features/User/SignUp";
import SignIn from "./features/User/SignIn";
import OrderRide from "./features/Orders/OrderRide";
import Background from "./features/Pages/Background";
import Features from "./features/Pages/Features";
import SignInAndLogOut from "./features/Pages/SignInAndLogOut";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Background />} />
        <Route path="/Background" element={<Background />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/OrderRide" element={<OrderRide />} />
        <Route path="/Features" element={<Features />} />
      </Routes>

      <SignInAndLogOut />
    </>
  );
}

export default App;
