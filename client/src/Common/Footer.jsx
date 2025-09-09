import "../Styles/Footer.css"
import { Box, Typography, } from "@mui/material";
import { projectImages } from "../Assets/Assets.js"
import { XIcon } from "../Assets/Icons";

const Footer = () => {
    return (
        <section className="footer-section">

            <div className="footer-container">

                <div className="upper-section">
                    <div className="footer-logo">
                        <img src={projectImages?.swiftDropLogo} alt="" />
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            overflow: "hidden",
                            transition: "all 0.4s ease",

                        }}>

                            <Typography sx={{
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "var(--text-green)",
                                fontFamily: "Edu NSW ACT Cursive, cursive",
                                marginTop: "20px"
                            }}>
                                Swift. Simple. Reliable.
                            </Typography>
                        </Box>
                    </div>

                    <div className="footer-content">
                        <ul>
                            <li><strong>Company</strong></li>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>

                    <div className="footer-content">
                        <ul>
                            <li><strong>Shop by Category</strong></li>
                            <li>Fresh Produce</li>
                            <li>Bakery & Biscuits</li>
                            <li>Meat & Seafood</li>
                            <li>Beverages</li>
                            <li>Baby Care</li>
                        </ul>
                    </div>

                    <div className="footer-content">
                        <ul>
                            <li><strong>Help & Support</strong></li>
                            <li>FAQs</li>
                            <li>Track Order</li>
                            <li>Refund Policy</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                </div>

                <div className="bottom-section">
                    <div className="social-links">
                        <div className="social"> <XIcon /></div>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Footer;