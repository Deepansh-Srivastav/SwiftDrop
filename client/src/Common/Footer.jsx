import "../Styles/Footer.css"
import { projectImages } from "../Assets/Assets.js"
import { XIcon } from "../Assets/Icons";
import { footerList } from "../Constants/footerConfig.js";
import CustomButtons from "../Components/CustomButtons.jsx";
import { useNavigate } from "react-router-dom"
import { Divider } from "@mui/material";


const Footer = () => {

    const navigate = useNavigate();

    return (
        <section className="footer-section">

            <div className="footer-container">

                <div className="image-logo-container">

                    <div className="footer-image flexBoxCentered">
                        <img src="https://images.unsplash.com/photo-1581264669997-3f222f331aaa?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>
                    <div className="footer-logo flexBoxCentered">
                        <img src={projectImages?.swiftDropLogo} alt="" />
                    </div>

                </div>

                <div className="footer-list-container">

                    <div className="list-text-container">
                        <div className="list-container">
                            <h3 className="smallest-heading">{"(DISCOVER)"}</h3>

                            {footerList?.map((item, index) => {
                                return (
                                    <div key={index} className="footer-list-item" onClick={() => navigate(item?.path)}>
                                        <CustomButtons
                                            buttonText={item?.label}
                                            size="46px"
                                            color={"var(--black-theme)"}
                                            className={"footer-button"} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="list-text-container2 ">
                        <div className="footer-text">
                            <h3 className="smallest-heading">{"(ACKNOWLEDGEMENT)"}</h3>

                            <p className="text-size-4">
                                We thank our users, partners, and team members who have made <span className="highlighter"> SwiftDrop </span> possible. Your trust drives us to keep improving and delivering everyday essentials with speed, convenience, and reliability.
                            </p>
                            <br />

                            <p className="text-size-4">
                                A special thanks to our delivery partners and local vendors for helping us fulfill our promise of “swift deliveries, anytime you need.” Together, we’re shaping a smarter and faster way of shopping.
                            </p>

                        </div>

                        <div className="footer-text margin-top-50">
                            <h3 className="smallest-heading">{"(INFO)"}</h3>

                            <p className="text-size-4">
                                <span className="alphabet">A : </span> SwiftDrop, Sector 21, Noida, India
                            </p>

                            <p className="text-size-4">
                                <span className="alphabet">E : </span> support@swiftdrop.com
                            </p>

                            <p className="text-size-4">
                                <span className="alphabet">P : </span> +91 98765 43210
                            </p>

                            <p className="text-size-4">
                                <span className="alphabet">T : </span> Mon – Sun, 8:00 AM – 10:00 PM
                            </p>


                        </div>
                    </div>

                </div>

            </div>

            <div className="copyright">
                <p className="text-size-4">
                    © {new Date().getFullYear()} SwiftDrop. All rights reserved. | Terms & Privacy
                </p>
            </div>

        </section>
    )
}

export default Footer;