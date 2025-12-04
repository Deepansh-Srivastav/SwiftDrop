import BackButton from "../Common/BackButton";
import "../Styles/Cart.css";
import { useNavigate } from "react-router-dom";
import { Divider } from '@mui/material'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { postApiRequestWrapper, getApiRequestWrapper } from "../Networking/Services/ApiCalls";
import { APIConfig } from "../Networking/Configuration/ApiConfig";
import { showErrorToast } from "../Components/CostomAlert.jsx";
import { CloseIcon, DeleteIcon } from "../Assets/Icons.js";


const Cart = () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const [isLoading, setIsLoading] = useState(false);

    const [cartData, setCartData] = useState({});

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


    async function handleItemDelete(productId) {

        console.log(productId);


        if (!productId) return;

        if (productId && isUserLoggedIn) {
            return;
        };

        if (productId && !isUserLoggedIn) {

            const cartData = JSON.parse(localStorage.getItem("cart"));
            console.log("cartData is - ", cartData);

            const updatedCartData = cartData?.filter((item) => {
                return item?.productId !== productId;
            })

            console.log(updatedCartData);


            localStorage.setItem("cart", JSON.stringify(updatedCartData));


            const bill = updatedCartData?.reduce((sum, item) => {
                return sum + item?.finalPrice * item?.quantity
            }, 0)

            const data = {
                cart: {
                    items: [...updatedCartData],
                    bill
                }
            }

            setCartData(data);
        }

    }

    useEffect(() => {
        loadCart();
    }, [userData]);


    if (cartData?.cart?.items.length === 0) {
        localStorage.removeItem("cart")
    }




    return (
        <main className="cart-page">
            <BackButton />
            <section className="cart-page-container">

                <div className="heading-container">
                    <h3 className="largest-heading " style={{ fontWeight: "800" }}>
                        SHOPPING CART
                    </h3>
                </div>

                {cartData?.cart?.items.length > 0 ? (
                    <div className="cart-data-container hide-scroll-bar">

                        <div className="cart-products-container hide-scroll-bar">

                            <div className="products-container">
                                <Divider sx={{ width: "100%" }} />

                                {cartData?.cart?.items?.map((product, index) => {
                                    return (
                                        <>
                                            <CartProductCard {...product} key={index} handleDelete={handleItemDelete} />
                                            <Divider sx={{ width: "100%", color: "black" }} />
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
                ) : (
                    <NoItemsFound message={"No item found in the cart"} />
                )}

            </section>
        </main>
    )
}

export default Cart;


function CartProductCard({ discount, finalPrice, name, price, productId, quantity, unit, image, handleDelete }) {

    const [itemQuantity, setItemQuantity] = useState(quantity);

    function handleQuantity(action) {
        if (action === "add") {
            setItemQuantity((prev) => {
                return prev += 1;
            });
        }
        if (action === "sub" && itemQuantity > 1) {
            setItemQuantity((prev) => {
                return prev = prev - 1;
            });
        }
    }

    return (
        <article className="cart-product-card-wrapper">

            <div className="cart-product-info">

                <div className="product-card-info-container">

                    {/* <span className="hover-delete-option">
                        <DeleteIcon />
                    </span> */}

                    <span className="cart-delete-button" onClick={() => handleDelete(productId)}>
                        <DeleteIcon />
                    </span>

                    <p className='text-size-3 product-name'>{name}</p>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <p className='unit-badge'>{unit}</p>
                        <p className='unit-badge'>Discount - {discount}%</p>
                    </div>
                </div>


                <div className="product-card-footer">


                    <div className="price-container">
                        <span className='price'>₹{price}</span>
                        <span className='final-price'>₹{finalPrice}</span>
                    </div>

                </div>

                <div className="quantity-counter margin-top-20">
                    <button className="qty-btn" onClick={() => { handleQuantity("sub") }}>-</button>
                    <span className="qty-value">{itemQuantity}</span>
                    <button className="qty-btn" onClick={() => { handleQuantity("add") }}>+</button>
                </div>

            </div>

            <div className="cart-product-image">
                <img src={image[0]} alt="" />
            </div>

            {/* <div className="cart-product-card-info-container">
                <p className="text-size-custom bold" style={{ textOverflow: "ellipsis" }}>{name}</p>
                <div className="price-container">
                    <span className='price'>₹{price}</span>
                    <span className='final-price'>₹{finalPrice}</span>
                </div>
                <p className="text-size-4">{unit}</p>

                <div className="quantity-counter">
                    <button className="qty-btn" onClick={() => { handleQuantity("sub") }}>-</button>
                    <span className="qty-value">{itemQuantity}</span>
                    <button className="qty-btn" onClick={() => { handleQuantity("add") }}>+</button>
                </div>

            </div>

            <div className="cart-product-card-image-container">
                <img src={image[0]} alt="" />
            </div> */}

        </article>
    )
}


export function NoItemsFound({ message }) {
    return (
        <div
            style={{
                width: "100%",
                padding: "2rem 1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#777",
                height: "60%"
            }}
        >
            <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="Empty"
                style={{ width: "clamp(100px, 10vw, 120px)", opacity: 0.8, marginBottom: "1rem" }}
            />
            <h3 style={{ marginBottom: "0.5rem", color: "#444" }} className="text-size-2">{message}</h3>
            <p style={{ color: "#777" }} className="text-size-3">
                Please add some items to continue.
            </p>
        </div>
    );
};