import { useEffect, useState } from "react";
import Navbar from "./Common/Navbar.jsx"
import LogIn from "./Pages/LogIn.jsx";
import "./Styles/Common.css"
import "./Styles/Themes.css"
import "./Styles/Responsive.css"
import { Routes, Route } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const App = () => {

  const location = useLocation();

  const currentPath = location.pathname

  const [showNavbar, setShowNavbar] = useState(true)

  useEffect(() => {

    if (currentPath == '/log-in' || currentPath == '/register-user') {
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
        <Route path="/log-in" element={<LogIn />}>  </Route>
        <Route path="/register-user" element={<LogIn />}>  </Route>
      </Routes>
    </>
  )
}

export default App