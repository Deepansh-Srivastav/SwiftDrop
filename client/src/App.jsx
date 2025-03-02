import "./Styles/Common.css"
import "./Styles/Themes.css"
import "./Styles/Responsive.css"
import { ToastContainer } from "react-toastify";
import AppRouter from "./Routes/AppRouter.jsx"
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { setUserDetails } from "./Redux/Features/UserDetailsSlice.js";

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const userData = localStorage.getItem('userData')

    if (userData) {
      dispatch(setUserDetails(JSON.parse(userData)))
    }
  }, [dispatch])

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <AppRouter />
    </>
  )
}

export default App