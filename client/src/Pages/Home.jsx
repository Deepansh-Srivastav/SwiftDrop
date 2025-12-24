import "../Styles/Home.css";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";

import CustomButtons from "../Components/CustomButtons.jsx";
import CategoryDisplaySection from "../Components/CategoryDisplaySection.jsx";
import ExploreRangeComponent from "../Components/ExploreRangeComponent.jsx";
import Footer from "../Common/Footer.jsx";
import { RotateLoader } from "../Common/Loader.js";

import { clearUserDetails } from "../Redux/Features/UserDetailsSlice.js";

import { APIConfig } from "../Networking/Configuration/ApiConfig.js";
import { handleUserLogOut } from "../Networking/Configuration/UserLogout.js";
import { getApiRequestWrapper } from "../Networking/Services/ApiCalls.js";

import { loggedInNavMenu } from "../Constants/menuConfig.js";

import { setGlobalCategoryDetails } from "../Redux/Features/GlobalCategorySlice.js";
import { IoCartOutline } from "../Assets/Icons.js";


const PRODUCTS_LIMIT = 6;
const CATEGORY_LIMIT = 4;

const Home = () => {

    const dispatch = useDispatch();

    const [preview, setPreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const [hasMorePages, setHasMorePages] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    let pageRef = useRef(1);
    let observerRef = useRef();

    async function fetchPreview() {
        const PREVIEW_URL = APIConfig?.categoryApiPath?.previewCategory;

        const FINAL_URL = `${PREVIEW_URL}?preview=true`;

        const response = await getApiRequestWrapper(FINAL_URL);

        if (response?.success === true && response?.error === false) {
            return setPreview(response?.data);
        }
    };

    async function fetchCategory(PAGE_NUMBER) {
        if (isLoading) return;
        setIsLoading(true);
        const URL = APIConfig?.categoryApiPath?.getCategoryAndProducts;

        const FINAL_URL = `${URL}?page=${PAGE_NUMBER}&limit=${CATEGORY_LIMIT}&product=${PRODUCTS_LIMIT}`

        const response = await getApiRequestWrapper(FINAL_URL);

        setHasMorePages(response?.meta?.hasMore);

        if (response?.error === false && response?.success === true && response?.categories?.length > 0) {
            setCategories((prev) => {
                return [
                    ...prev,
                    ...response?.categories || null
                ]
            })
            dispatch(setGlobalCategoryDetails(response?.categories || []));
            return setIsLoading(false);
        };
        setIsLoading(false);
    };

    useEffect(() => {
        const node = observerRef.current;
        if (!node) return;

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && hasMorePages) {
                const nextPage = ++pageRef.current;
                fetchCategory(nextPage);
            }
        })
        observer.observe(observerRef.current)
        if (hasMorePages) {
            observer.observe(node);
        }

        return () => {
            observer.disconnect();
        };
    }, [hasMorePages])


    useEffect(() => {
        fetchPreview();
        fetchCategory(1);
    }, [])

    return (
        <section>
            <HomeNavbar />

            <div className="parallax1">

            </div>

            <div className="landing-text-section">

                <motion.div
                    className="text-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    <p className="text-size-1">
                        Everything you need, delivered instantly.
                    </p>

                    <div className="sub-text text-size-3">
                        <span>FRESH FRUITS</span>
                        <span>SNACKS</span>
                        <span>ESSENTIALS</span>
                    </div>
                </motion.div>

                <motion.div className="landing-paragraph"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    <p className="text-size-2"><span className="highlighter">SwiftDrop</span> makes everyday shopping effortless. From fresh groceries and essentials to snacks and drinks, everything arrives at your door in minutes. Fast, simple, and reliable — so you spend less time waiting and more time enjoying.</p>
                </motion.div>
            </div>

            <div className="gallery-section" >

                <motion.div
                    className="gallery-container"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true, amount: 0.3 }}>

                    <h3 className="largest-heading ">
                        EXPLORE <br /> OUR RANGE
                    </h3>

                    <ExploreRangeComponent preview={preview} />

                </motion.div>
            </div>

            {categories?.map((item, index) => {

                return (
                    <CategoryDisplaySection {...item} key={index} path={`/category/${item?.category_id}/sub-category/${item?.subCategories[0]?._id}`} />
                )
            })}

            {isLoading && (
                <div className="loader-section">
                    <RotateLoader />
                </div>
            )}

            <div ref={observerRef}></div>

            {!isLoading && <Footer />}

        </section>
    )
};

export default Home;

export function HomeNavbar() {

    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const userData = useSelector((state) => {
        return state.userDetails
    });

    const isUserLoggedIn = userData && Object.keys(userData).length > 0;

    function handleClose() {
        setShowDropdown(false);
    }

    function dropdownHandler() {

        console.log(showDropdown);


        if (showDropdown) {
            handleClose();
            return;
        }

        setShowDropdown((prev) => {
            return !prev;
        });

    };

    async function logoutHandler() {
        const response = await handleUserLogOut(handleClose)

        if (response === true) {
            dispatch(clearUserDetails());
            return;
        }
    }


    return (
        <>
            <motion.nav
                className="home-nav"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeIn" }}
            >
                <div className="swiftdrop-logo">
                    <h1><span className="highlighter">SW</span>IFTDROP</h1>
                </div>

                <div className="cart-menu-container">


                    <div className="nav-menu">

                        {isUserLoggedIn ?
                            <>
                                <div className="userAvatar" onClick={() => {
                                    dropdownHandler()
                                }}>
                                    <Avatar src={userData?.avatar} alt={name} sx={{
                                        width: "40px",
                                        height: "420x",
                                        marginRight: "15px"
                                    }}>
                                        {userData?.name?.charAt(0).toUpperCase() || '?'}
                                    </Avatar>

                                </div>
                            </>
                            :
                            <div className="nav-button"
                                onClick={dropdownHandler}>
                                <CustomButtons
                                    buttonText={"Menu"}
                                    color={"var(--color-one)"}
                                    fontWeight="800" />
                            </div>


                        }

                        {showDropdown && (

                            <div className="dropDown">

                                <div className="menu-list-container">
                                    {isUserLoggedIn ?
                                        <>

                                            {loggedInNavMenu?.map((item, index) => {

                                                const Icon = item?.icon
                                                return <>
                                                    <span
                                                        key={index}
                                                        onClick={() => {
                                                            navigate(item?.path);
                                                            handleClose();
                                                        }} >
                                                        <Icon sx={{ mr: 2 }} fontSize='medium' />
                                                        {item?.label}
                                                    </span>
                                                </>
                                            })}


                                            <Divider />

                                            <span onClick={() => {
                                                logoutHandler()
                                            }} >
                                                <LogoutIcon sx={{ mr: 2 }} />
                                                Log Out
                                            </span>









                                        </>
                                        :
                                        <>
                                            <span onClick={() => navigate("/auth/log-in")}> Login </span>
                                            <span onClick={() => navigate("/auth/register-user")}> Signup </span>
                                        </>
                                    }
                                </div>
                            </div>
                        )}
                    </div>

                    <button className="nav-cart-button" onClick={()=>navigate("/cart")}>
                        <IoCartOutline />
                        {/* <span className="cart-badge">1</span> */}
                    </button>

                </div>
            </motion.nav >

        </>
    );
};
