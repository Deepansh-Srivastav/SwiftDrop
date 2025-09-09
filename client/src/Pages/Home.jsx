import ProductsDisplaySection from "../Common/ProductsDisplaySection";
import GalleryComponent from "../Components/GalleryComponent";
import "../Styles/Home.css"
import { motion } from "framer-motion";
import { bakeryProducts, meatProducts } from "../Assets/DummyData.js"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Person4Icon from '@mui/icons-material/Person4';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import Footer from "../Common/Footer.jsx";
import CustomButtons from "../Components/CustomButtons.jsx";

const Home = () => {

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const slowScroll = scrollY * -0.1; // scroll speed reduced to 10%
            const parallax = document.querySelector(".parallax1");
            if (parallax) {
                parallax.style.backgroundPosition = `center ${slowScroll}px`;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


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

                    <GalleryComponent />
                </motion.div>
            </div>

            <ProductsDisplaySection products={bakeryProducts} heading={"Bakery & Biscuits"} image={"https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />

            <ProductsDisplaySection products={meatProducts} heading={"Fresh Meat & Seafood"} image={"https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />

            <Footer />

        </section>
    )
}

export default Home;

export function HomeNavbar() {

    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const userData = useSelector((state) => {
        return state.userDetails
    });

    const isUserLoggedIn = userData && Object.keys(userData).length > 0;


    function dropdownHandler() {
        setShowDropdown((prev) => {
            return !prev;
        });
    }

    function handleClose() {
        setShowDropdown(false);
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

                {isUserLoggedIn
                    ?
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
                    <div>


                        <div className="nav-button">
                            <CustomButtons buttonText={"Menu"} color={"var(--color-one)"} fontWeight="800"/>
                        </div>


                        {showDropdown && (
                            <>
                                <motion.div className="dropDown" initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, ease: "easeIn" }}>

                                    <div className="arrow"></div>

                                    {isUserLoggedIn ?
                                        <>
                                            <span>
                                                <Person4Icon sx={{ mr: 2 }} fontSize='medium'
                                                    onClick={() => {
                                                        navigate("/my-account/orders");
                                                        handleClose();
                                                    }}
                                                />
                                                My Profile
                                            </span>

                                            <span>
                                                <ShoppingBagIcon sx={{ mr: 2 }} />
                                                Orders
                                            </span>


                                            <span onClick={() => {
                                                navigate("/my-account/address");
                                                handleClose()
                                            }} >
                                                <HomeIcon sx={{ mr: 2 }} />
                                                Address
                                            </span>



                                        </>
                                        :
                                        <>
                                            <span onClick={() => navigate("/auth/log-in")}> Login </span>
                                            <span onClick={() => navigate("/auth/register-user")}> Signup </span>
                                        </>
                                    }

                                </motion.div>
                            </>
                        )}
                    </div>}
            </motion.nav >

        </>
    );
}

