import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import success from "../Assets/Animation/success.gif";
import "../Styles/Success.css"

const SuccessPage = () => {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(6);

    useEffect(() => {
        if (counter === 0) {
            navigate("/");
            return;
        }

        const timer = setTimeout(() => {
            setCounter((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [counter, navigate]);

    return (
        <section className="success-page">
            <div className="success-card">
                <img
                    src={success}
                    alt="Order confirmed"
                    className="success-gif"
                />

                <p className="success-text">Order confirmed</p>

                <p className="redirect-text">
                    You will be redirected to the home page
                </p>

                <span className="counter">{counter}s</span>
            </div>
        </section>
    );
};

export default SuccessPage;