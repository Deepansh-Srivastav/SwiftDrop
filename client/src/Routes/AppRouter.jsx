import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LogIn from "../Auth_Pages/LogIn";
import RegisterUser from "../Auth_Pages/RegisterUser";
import ForgotPassword from "../Auth_Pages/ForgotPassword";
import ResetPassword from "../Auth_Pages/ResetPassword";
import { useSelector } from "react-redux";
import Navbar from "../Common/Navbar"
import PageNotFound from "../Pages/PageNotFound";
import Home from "../Pages/Home";
import AccountPage from "../Pages/Account/AccountPage";
import MyProfile from "../Pages/Account/MyProfile";
import Category from "../Pages/Account/Category";
import SubCategory from "../Pages/Account/SubCategory";

const AppRouter = () => {

    const [showNavbar, setShowNavbar] = useState(true)

    const location = useLocation()

    const currentRoute = location.pathname

    const publicRoutes = {
        home: '/',
        searchPage: "/search-product",

    }

    useEffect(() => {
        setShowNavbar(Object.values(publicRoutes).includes(currentRoute));
    }, [currentRoute])

    const isOtpVerified = useSelector((state) => {
        return state.isOtpVerified.value
    })

    if (currentRoute == "/") {
        localStorage.removeItem('userEmail')
    }

    return (
        <>
            {/* {showNavbar && <Navbar />} */}
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/search-product" element={<h1>This is the search page</h1>}></Route>

                <Route path="/my-account" element={<AccountPage />}>
                    <Route path="profile" element={<MyProfile />} />

                    <Route path="category" element={<h1><Category /></h1>} />

                    <Route path="sub-category" element={<SubCategory />} />

                    <Route path="upload-product" element={<h1>thi si the upload-product page</h1>} />

                    <Route path="all-products" element={<h1>thi si the all-products page</h1>} />

                    <Route path="orders" element={<h1>thi si the Orders page</h1>} />
                    <Route path="address" element={<h1>thi si the address page</h1>} />
                    <Route path="delete" element={<h1>thi si the delete page</h1>} />
                </Route>


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