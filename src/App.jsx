

// import { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./App.css";

// import SignUp from "./features/User/SignUp";
// import SignIn from "./features/User/SignIn";
// import OrderRide from "./features/Orders/OrderRide";
// import Background from "./features/Pages/Background";
// import Features from "./features/Pages/Features";
// import SignInAndLogOut from "./features/Pages/SignInAndLogOut";
// import Pricing from "./features/Pages/Pricing";
// import OurButtons from "./features/Pages/OurButtons";
// import Footer from "./features/Pages/Footer"
// import ContactSection from "./features/Pages/ContactSection";
// import RideShareInfoPage from "./features/Pages/RideShareInfoPage"
// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Background />} />
//         <Route path="/Background" element={<Background />} />
//         <Route path="/SignUp" element={<SignUp />} />
//         <Route path="/SignIn" element={<SignIn />} />
//         <Route path="/OrderRide" element={<OrderRide />} />
//         <Route path="/Features" element={<Features />} />
//         <Route path="/pricing" element={<Pricing />} />
//         <Route path="/contact" element={<ContactSection />} />
//         <Route path="/guide" element={<RideShareInfoPage />} />
//       </Routes>

//       <SignInAndLogOut />
//     </>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./features/User/SignUp";
import SignIn from "./features/User/SignIn";
import OrderRide from "./features/Orders/OrderRide";
import Background from "./features/Pages/Background";
import Features from "./features/Pages/Features";
import SignInAndLogOut from "./features/Pages/SignInAndLogOut";
import Pricing from "./features/Pages/Pricing";
import ContactSection from "./features/Pages/ContactSection";
import RideShareInfoPage from "./features/Pages/RideShareInfoPage";

function App() {
  return (
<>      <Routes>
        <Route path="/"           element={<Background />} />
        <Route path="/background" element={<Background />} />
        <Route path="/signup"     element={<SignUp />} />
        <Route path="/signin"     element={<SignIn />} />
        <Route path="/orderride"  element={<OrderRide />} />
        <Route path="/features"   element={<Features />} />
        <Route path="/pricing"    element={<Pricing />} />
        <Route path="/contact"    element={<ContactSection />} />
        <Route path="/guide"      element={<RideShareInfoPage />} />
      </Routes>

      <SignInAndLogOut />
    </>
  );
}

export default App;
