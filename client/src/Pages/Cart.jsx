import BackButton from "../Common/BackButton";
import "../Styles/Cart.css";
import { useNavigate } from "react-router-dom";
import { Divider } from '@mui/material'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { postApiRequestWrapper, getApiRequestWrapper } from "../Networking/Services/ApiCalls";
import { APIConfig } from "../Networking/Configuration/ApiConfig";
import { showErrorToast } from "../Components/CostomAlert.jsx";


const Cart = () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const [isLoading, setIsLoading] = useState(false);

    const [cartData, setCartData] = useState(null);

    const fetchCartDetails = useCallback(async () => {

        setIsLoading(true);

        const CART_URL = APIConfig?.cartItemPath?.getCartItem;

        const res = await getApiRequestWrapper(CART_URL);

        if (res?.error === false && res?.success === true && res?.cart) {
            setCartData(res?.cart);
            setIsLoading(false);
            return;
        }

        showErrorToast(res?.message || "Cant fetch cart details")
        setIsLoading(false);



    }, [])

    function generateData() {
        const cartData = JSON.parse(localStorage.getItem("cart"))
        const bill = cartData?.reduce((sum, item) => {
            return sum + item?.finalPrice * item?.quantity;
        }, 0);
        const data = {
            cart: {
                items: [...cartData],
                bill
            }
        }

        setCartData(data)
    }

    const userData = useSelector((state) => {
        return state.userDetails
    });

    const isUserLoggedIn = userData && Object.keys(userData).length > 0;

    async function loadCart() {

        if (isUserLoggedIn) {
            await fetchCartDetails();
            return;
        }
        else {
            if (localStorage.getItem("cart")) {
                generateData()
                return;
            }
        }

    }

    useEffect(() => {
        loadCart();
    }, [userData]);




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

                        <article className="cart-price-card">
                            <div className="cart-price-card-heading-container">
                                <h3 className="text-size-1">Order Summary</h3>
                                {/* <h3 className="text-size-1" style={{color:"black"}}>Order Summary</h3> */}
                            </div>

                            <div className="cart-price-card-data-container">

                                <ul className="cart-price-data-list">
                                    <li className="cart-price-data-list-item">
                                        <span className="cart-detail text-size-3">Item Total</span>
                                        <span className="cart-detail-value">₹800</span>
                                    </li>
                                    <li className="cart-price-data-list-item">
                                        <span className="cart-detail text-size-3">Discount</span>
                                        <span className="cart-detail-value">₹300</span>
                                    </li>
                                    <li className="cart-price-data-list-item">
                                        <span className="cart-detail text-size-3">GST</span>
                                        <span className="cart-detail-value">18%</span>
                                    </li>
                                    <li className="cart-price-data-list-item">
                                        <span className="cart-detail text-size-3">Shipping</span>
                                        <span className="cart-detail-value">Free</span>
                                    </li>
                                </ul>

                            </div>

                            <div className="cart-price-card-total-container">
                                <span className="cart-detail text-size-2">Subtotal</span>
                                <span className="cart-detail-value">₹{cartData?.cart?.bill}</span>
                            </div>
                        </article>

                        <div className="checkout-button-container">
                            <button className="text-size-4 checkout-button">Checkout</button>
                        </div>

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
                <img src={image[0]} alt="" />
            </div>

        </article>
    )
}
