import { useEffect, useState } from "react";
import Navbar from "./Common/Navbar.jsx"
import LogIn from "./Pages/LogIn.jsx";
import "./Styles/Common.css"
import "./Styles/Themes.css"
import "./Styles/Responsive.css"
import { Routes, Route } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import RegisterUser from "./Pages/RegisterUser.jsx";

const App = () => {

  const location = useLocation();

  const currentPath = location.pathname

  const [showNavbar, setShowNavbar] = useState(true)

  useEffect(() => {

    if (currentPath == '/auth/log-in' || currentPath == '/auth/register-user') {
      setShowNavbar(false)
    } 
    else{
      setShowNavbar(true)
    }
  }, [currentPath])

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/home" element={<h1>Home</h1>}>  </Route>
        <Route path="/auth/log-in" element={<LogIn />}>  </Route>
        <Route path="/auth/register-user" element={<RegisterUser />}>  </Route>
      </Routes>
    </>
  )
}

export default App