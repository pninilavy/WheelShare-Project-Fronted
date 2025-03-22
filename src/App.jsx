import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './features/User/SignUp'
import SignIn from './features/User/SignIn'
import OrderRide from './features/Orders/OrderRide'
import Background from "./features/Pages/Background"
import Features from "./features/Pages/Features"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <OrderRide></OrderRide> */}
      {/* <SignIn></SignIn> */}
      {/* <SignUp></SignUp> */}
      <Background></Background>
      
     
    </>
  );
}

export default App
