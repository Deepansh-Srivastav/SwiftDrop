import GalleryComponent from "../Components/GalleryComponent";
import "../Styles/Home.css"
import { motion } from "framer-motion";

const Home = () => {

    return (
        <section>
            <HomeNavbar />

            <div className="parallax1">

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

            <div className="gallery-section">

                <div className="gallery-container">
                    
                    <h3 className="largest-heading margin-bottom-20">
                        EXPLORE <br /> OUR RANGE
                    </h3>

                    <GalleryComponent />
                </div>
            </div>

        </section>
    )
}

export default Home

export function HomeNavbar() {

    return (
        <>
            {/* <nav className="home-nav">

                <div className="swiftdrop-logo">
                    <h1><span className="highlighter">SW</span>iftDrop</h1>
                </div>

                <div>
                    <button className="nav-button">
                        <span className="button-text front">Menu</span>
                        <span className="button-text back">Menu</span>
                    </button>
                </div>
            </nav> */}

            <motion.nav
                className="home-nav"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeIn" }}
            >
                <div className="swiftdrop-logo">
                    <h1><span className="highlighter">SW</span>IFTDROP</h1>
                </div>

                <div>
                    <motion.button
                        className="nav-button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="button-text front">Menu</span>
                        <span className="button-text back">Menu</span>
                    </motion.button>
                </div>
            </motion.nav>

        </>
    );
}


{/* <motion.div
    className="landing-paragraph"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 1 }}
> */}