import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LogIn from "../Auth_Pages/LogIn";
import RegisterUser from "../Auth_Pages/RegisterUser";
import ForgotPassword from "../Auth_Pages/ForgotPassword";
import ResetPassword from "../Auth_Pages/ResetPassword";
import { useSelector } from "react-redux";
import Navbar from "../Common/Navbar"
import PageNotFound from "../Pages/PageNotFound";

const AppRouter = () => {

    const [showNavbar, setShowNavbar] = useState(true)

    const location = useLocation()

    const currentRoute = location.pathname

    const publicRoutes = {
        home: '/'
    }

    useEffect(() => {
        const authRoutes = [
            "/auth/log-in",
            "/auth/register-user",
            "/auth/forgot-password",
            "/auth/reset-password",
        ]
        setShowNavbar(Object.values(publicRoutes).includes(currentRoute));
    }, [currentRoute])

    const isOtpVerified = useSelector((state) => {
        return state.isOtpVerified.value
    })

    return (
        <>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<h1>Home</h1>}></Route>
                <Route path="/auth/log-in" element={<LogIn />}></Route>
                <Route path="/auth/register-user" element={<RegisterUser />}></Route>
                <Route path="/auth/forgot-password" element={<ForgotPassword />}></Route>
                {/* <Route path="/auth/reset-password" element={isOtpVerified ? <ResetPassword /> : <Navigate to="*" />}></Route> */}

                <Route path="/auth/reset-password" element={<ResetPassword />}></Route>

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    )
}

export default AppRouter