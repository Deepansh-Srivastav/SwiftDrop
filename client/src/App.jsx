import "./Styles/Common.css"
import "./Styles/Themes.css"
import "./Styles/Responsive.css"
import { ToastContainer } from "react-toastify";
import AppRouter from "./Routes/AppRouter.jsx"

const App = () => {

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <AppRouter />
    </>
  )
}

export default App