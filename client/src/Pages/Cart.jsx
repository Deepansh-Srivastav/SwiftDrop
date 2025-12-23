import BackButton from "../Common/BackButton";
import "../Styles/Cart.css";
import { useNavigate } from "react-router-dom";
import { Divider } from '@mui/material'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { patchApiRequestWrapper, getApiRequestWrapper } from "../Networking/Services/ApiCalls";
import { APIConfig } from "../Networking/Configuration/ApiConfig";
import { showErrorToast, showSuccessToast } from "../Components/CostomAlert.jsx";
import { CloseIcon, DeleteIcon } from "../Assets/Icons.js";
import { cartDataFromLocalStorage } from "../Utils/commonFunctions.js";

const Cart = () => {
    const navigate = useNavigate();

    const userData = useSelector((state) => {
        return state.userDetails
    });

    const isUserLoggedIn = userData && Object.keys(userData).length > 0;

    const [isLoading, setIsLoading] = useState(false);

    const [cartData, setCartData] = useState(isUserLoggedIn ? {} : {
        cart: {
            items: cartDataFromLocalStorage("cart", "get"),
        },
        bill: 0
    });

    const items = cartData?.cart?.items || [];

    const totals = items?.reduce((acc, item) => {
        const price = Number(item?.price) || 0;
        const final = Number(item.finalPrice) || price;
        const qty = Number(item.quantity) || 1;

        acc.totalPrice += price * qty;
        acc.totalFinalPrice += final * qty;
        acc.totalDiscountAmount += (price - final) * qty;

        return acc;

    }, {
        totalPrice: 0,
        totalFinalPrice: 0,
        totalDiscountAmount: 0
    });

    const { totalPrice, totalFinalPrice, totalDiscountAmount } = totals;

    const fetchCartDetails = useCallback(async () => {

        setIsLoading(true);

        const CART_URL = APIConfig?.cartItemPath?.getCartItem;

        const res = await getApiRequestWrapper(CART_URL);

        if (res?.error === false && res?.success === true) {
            setCartData(res);
            setIsLoading(false);
            return;
        };

        showErrorToast(res?.message || "No user items found in the cart");
        setIsLoading(false);

    }, []);

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
        };

        setCartData(data);
    };

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

    };

    async function handleItemDelete(productId) {

        if (!productId) return;

        if (productId && isUserLoggedIn) {
            return;
        };

        if (productId && !isUserLoggedIn) {

            const cartData = JSON.parse(localStorage.getItem("cart"));

            const updatedCartData = cartData?.filter((item) => {
                return item?.productId !== productId;
            })


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

    };

    async function handleItemQuantity(productId, action) {

        if (!productId || !action) return;

        if (isUserLoggedIn && productId && action) {

            const URL = APIConfig?.cartItemPath?.updateCartItem;

            let { quantity } = cartData?.cart?.items.find((item) => {
                return item?.productId === productId;
            }) || null;

            let payload = {
                productId
            };

            if (action === "increment") payload.quantity = quantity + 1;

            if (action === "decrement") payload.quantity = quantity - 1;

            const response = await patchApiRequestWrapper(URL, payload);

            if (response && response?.success === true && response?.error === false) {
                showSuccessToast(response?.message);
                await fetchCartDetails();
                return
            };

            showErrorToast(response?.message);

            return;
        }

        if (productId && !isUserLoggedIn && action) {
            const data = cartDataFromLocalStorage("cart", "get");

            if (action === "increment") {
                const updatedData = data?.map((item) => {
                    if (item?.productId === productId) {
                        item.quantity += 1
                    }
                    return item;
                });

                const bill = updatedData?.reduce((sum, item) => {
                    return sum + item?.finalPrice * item?.quantity
                }, 0);

                const incrementedData = {
                    cart: {
                        items: [...updatedData],
                        bill
                    }
                };

                cartDataFromLocalStorage("cart", "set", updatedData);

                setCartData(incrementedData);

                return
            }

            if (action === "decrement") {
                const updatedData = data?.map((item) => {
                    if (item?.productId === productId && item?.quantity > 1) {
                        item.quantity -= 1
                    }
                    return item;
                });

                const bill = updatedData?.reduce((sum, item) => {
                    return sum + item?.finalPrice * item?.quantity
                }, 0);

                const decrementData = {
                    cart: {
                        items: [...updatedData],
                        bill
                    }
                };

                cartDataFromLocalStorage("cart", "set", updatedData);

                setCartData(decrementData);

                return
            }


        }

    };

    useEffect(() => {
        loadCart();
    }, [userData]);

    if (cartData?.cart?.items?.length === 0) {
        localStorage.removeItem("cart")
    };

    return (
        <main className="cart-page">
            <BackButton />
            <section className="cart-page-container">

                <div className="heading-container">
                    <h3 className="largest-heading " style={{ fontWeight: "800" }}>
                        SHOPPING CART
                    </h3>
                </div>

                {cartData?.cart?.items?.length > 0 ? (
                    <div className="cart-data-container hide-scroll-bar">

                        <div className="cart-products-container hide-scroll-bar">

                            <div className="products-container">
                                <Divider sx={{ width: "100%" }} />

                                {cartData?.cart?.items?.map((product, index) => {
                                    return (
                                        <>
                                            <CartProductCard
                                                {...product}
                                                key={index}
                                                handleDelete={handleItemDelete}
                                                handleQuantity={handleItemQuantity}
                                            />
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
                                            <span className="cart-detail text-size-3">Total amount</span>
                                            <span className="cart-detail-value">₹{totalPrice}</span>
                                        </li>
                                        <li className="cart-price-data-list-item">
                                            <span className="cart-detail text-size-3">Total discount</span>
                                            <span className="cart-detail-value">₹{totalDiscountAmount}</span>
                                        </li>
                                        <li className="cart-price-data-list-item">
                                            <span className="cart-detail text-size-3">GST <sup>Included</sup></span>
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
                                    <span className="cart-detail-value">₹{totalFinalPrice}</span>
                                </div>
                            </article>


                            <p className="text-size-4 congrats-text">{`Congratulation's you saved ₹${totalDiscountAmount} on this order`} </p>

                            <div className="checkout-button-container">
                                <button className="text-size-4 checkout-button" 
                                onClick={()=>navigate("/checkout")}
                                >Checkout</button>
                            </div>

                        </div>

                    </div>
                ) : (
                    <NoItemsFound message={"No item found in the cart"} />
                )}

            </section>
        </main>
    );
};

export default Cart;

function CartProductCard({ discount, finalPrice, name, price, productId, quantity, unit, image, handleDelete, handleQuantity }) {

    return (
        <article className="cart-product-card-wrapper">

            <div className="cart-product-info">

                <div className="product-card-info-container">

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
                    <button className="qty-btn" onClick={() => handleQuantity(productId, "decrement")} disabled={quantity > 1 ? false : true}>-</button>
                    <span className="qty-value">{quantity}</span>
                    <button className="qty-btn" onClick={() => handleQuantity(productId, "increment")}>+</button>
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
};

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