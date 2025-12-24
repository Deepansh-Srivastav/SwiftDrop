import { useCallback, useState, useEffect } from 'react'
import BackButton from '../Common/BackButton'
import { getApiRequestWrapper } from '../Networking/Services/ApiCalls';
import { APIConfig } from '../Networking/Configuration/ApiConfig';
import { showErrorToast } from '../Components/CostomAlert';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [cartData, setCartData] = useState([]);

    const fetchCartDetails = useCallback(async () => {

        setIsLoading(true);

        const CART_URL = APIConfig?.cartItemPath?.getCartItem;

        const res = await getApiRequestWrapper(CART_URL);

        if (res?.error === false && res?.success === true) {
            if (res?.cart?.items?.length === 0) navigate("/");
            setCartData(res);
            setIsLoading(false);
            return;
        };

        showErrorToast(res?.message || "No user items found in the cart");
        setIsLoading(false);

    }, []);

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

    useEffect(() => {
        fetchCartDetails();
    }, [])

    return (
        <main className="cart-page">
            <BackButton path={"/cart"} />
            <section className="cart-page-container">

                <div className="heading-container">
                    <h3 className="largest-heading " style={{ fontWeight: "800" }}>
                        CHECKOUT
                    </h3>
                </div>

                <div className="cart-data-container hide-scroll-bar">

                    <div className="cart-products-container hide-scroll-bar">

                        <div className="products-container">

                        </div>
                    </div>

                    <div className="cart-price-container">

                        <article className="cart-price-card">
                            <div className="cart-price-card-heading-container">
                                <h3 className="text-size-1">Order Summary</h3>
                            </div>

                            <div className="cart-price-card-data-container">

                                <ul className="cart-price-data-list">
                                    <li className="cart-price-data-list-item">
                                        <span className="cart-detail text-size-3">Total Items</span>
                                        <span className="cart-detail-value">{cartData?.cart?.items?.length}</span>
                                    </li>
                                    <li className="cart-price-data-list-item">
                                        <span className="cart-detail text-size-3">Shipping</span>
                                        <span className="cart-detail-value">Free</span>
                                    </li>
                                    <li className="cart-price-data-list-item">
                                        <span className="cart-detail text-size-3">Total amount</span>
                                        <span className="cart-detail-value">₹{totalPrice}</span>
                                    </li>
                                    <li className="cart-price-data-list-item">
                                        <span className="cart-detail text-size-3">Total discount</span>
                                        <span className="cart-detail-value">₹{totalDiscountAmount}</span>
                                    </li>
                                </ul>

                            </div>

                            <div className="cart-price-card-total-container">
                                <span className="cart-detail text-size-2">Grand Total</span>
                                <span className="cart-detail-value">₹{totalFinalPrice}</span>
                            </div>
                        </article>


                        <div className="checkout-button-container">
                            <button className="text-size-4 checkout-button">Pay Online</button>
                        </div>

                        <div className="checkout-button-container">
                            <button className="text-size-4 checkout-button">Cash on delivery</button>
                        </div>

                    </div>

                </div>

            </section>
        </main>
    );
};

export default Checkout;