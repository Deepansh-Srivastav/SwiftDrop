import ProductsDisplaySection from "../Common/ProductsDisplaySection";
import GalleryComponent from "../Components/GalleryComponent";
import "../Styles/Home.css"
import { maxGeneratorDuration, motion, useForceUpdate } from "framer-motion";
import { bakeryProducts, meatProducts } from "../Assets/DummyData.js"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import Footer from "../Common/Footer.jsx";
import CustomButtons from "../Components/CustomButtons.jsx";
import { loggedInNavMenu } from "../Constants/menuConfig.js";
import { handleUserLogOut } from "../Networking/Configuration/UserLogout.js";
import { useDispatch } from "react-redux";
import { clearUserDetails } from "../Redux/Features/UserDetailsSlice.js";
import CategoryDisplaySection from "../Components/CategoryDisplaySection.jsx";
import { APIConfig } from "../Networking/Configuration/ApiConfig.js";
import { getApiRequestWrapper } from "../Networking/Services/ApiCalls.js";
import { useEffect } from "react";
import ExploreRangeComponent from "../Components/ExploreRangeComponent.jsx";

const Home = () => {

    const [preview, setPreview] = useState(null);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollY = window.scrollY;
    //         const slowScroll = scrollY * -0.1; // scroll speed reduced to 10%
    //         const parallax = document.querySelector(".parallax1");
    //         if (parallax) {
    //             parallax.style.backgroundPosition = `center ${slowScroll}px`;
    //         }
    //     };

    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    async function fetchPreview() {
        const PREVIEW_URL = APIConfig?.categoryApiPath?.previewCategory;

        const FINAL_URL = `${PREVIEW_URL}?preview=true`;

        const response = await getApiRequestWrapper(FINAL_URL);

        if (response?.success === true && response?.error === false) {
            return setPreview(response?.data);
        }
    };

    useEffect(() => {
        fetchPreview();
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

                    <h3 className="largest-heading margin-bottom-20">
                        EXPLORE <br /> OUR RANGE
                    </h3>

                    {/* <GalleryComponent preview={preview} /> */}

                    <ExploreRangeComponent preview={preview} />

                </motion.div>
            </div>


            <CategoryDisplaySection />

            <ProductsDisplaySection products={bakeryProducts} heading={"Aata Daal & Rice"} image={"https://res.cloudinary.com/dqo7vuizb/image/upload/v1763464071/SwiftDrop/ybljtd4o9cagyghv23cs.png"} />

            <ProductsDisplaySection products={meatProducts} heading={"Fresh Meat & Seafood"} image={"https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />

            <Footer />

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

                                <p>{userData?.name}</p>

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
            </motion.nav >

        </>
    );
};
