import BackButton from "../Common/BackButton";
import "../Styles/Cart.css";
import { useNavigate } from "react-router-dom";
import { Divider } from '@mui/material'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const Cart = () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const [isLoading, setIsLoading] = useState(false);

    console.log(cart);

    const userData = useSelector((state) => {
        return state.userDetails
    });

    const isUserLoggedIn = userData && Object.keys(userData).length > 0;

    async function loadCart() {

        if (isUserLoggedIn) {
            console.log("User logged in -", isUserLoggedIn);
            return
        }
        else {
            console.log("User logged in -", isUserLoggedIn);
            return
        }

    }

    useEffect(() => {
        loadCart();
    }, []);


    return (
        <main className="cart-page">
            <BackButton />
            <section className="cart-page-container">
                <div className="heading-container">
                    <h3 className="largest-heading " style={{ fontWeight: "800" }}>
                        SHOPPING CART
                    </h3>
                </div>
                <div className="cart-data-container hide-scroll-bar">

                    <div className="cart-products-container hide-scroll-bar">
                        <div className="products-container">
                            <Divider sx={{ width: "100%" }} />

                            {cart?.map((product, index) => {
                                return (
                                    <>
                                        <CartProductCard {...product} key={index} />
                                        <Divider sx={{ width: "100%" }} />
                                    </>
                                )
                            })}
                        </div>
                    </div>

                    <div className="cart-price-container">

                    </div>

                </div>
            </section>
        </main>
    )
}

export default Cart;


function CartProductCard({ discount, finalPrice, name, price, productId, quantity, unit, image }) {
    return (
        <article className="cart-product-card-wrapper">

            <div className="cart-product-card-info-container">
                <p className="text-size-2">{name}</p>
                <p className="text-size-3">₹{finalPrice}</p>
                <p className="text-size-3">{unit}</p>
                -1+
            </div>

            <div className="cart-product-card-image-container">
                <img src={image} alt="" />
            </div>

        </article>
    )
}
