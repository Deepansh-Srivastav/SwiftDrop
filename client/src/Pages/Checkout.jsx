import { useCallback, useState, useEffect } from 'react'
import BackButton from '../Common/BackButton'
import { getApiRequestWrapper, postApiRequestWrapper } from '../Networking/Services/ApiCalls';
import { APIConfig } from '../Networking/Configuration/ApiConfig';
import { showErrorToast } from '../Components/CostomAlert';
import { useNavigate } from 'react-router-dom';
import { ORDER_TYPE } from "../Constants/enums.js"

const Checkout = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [cartData, setCartData] = useState([]);

    const [allAddresses, setAllAddresses] = useState([]);

    const [orderDetails, setOrderDetails] = useState({
        payment_method: "",
        delivery_address: "",
    });

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

    const fetchAddressDetails = useCallback(async () => {
        setIsLoading(true)
        const FINAL_URL = APIConfig?.addressPath?.getAddress;
        const res = await getApiRequestWrapper(FINAL_URL);

        if (res?.error === false && res?.success === true) {

            setAllAddresses(res?.address);
            setIsLoading(false);
            return;
        };


    },
        [],
    )

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

    async function handleCashOnDelivery() {

        const FINAL_URL = APIConfig?.orderPath?.createOrder;
        const payload = {
            ...orderDetails,
            payment_method: ORDER_TYPE.COD_ORDER,
        };

        const response = await postApiRequestWrapper(FINAL_URL, payload);

        if (response && response?.success === true && response?.error === false) {
            navigate("/order-success");
            return;
        };

        showErrorToast(response?.message || "Cant place the order.");

    };

    async function handleOnlinePayment() {

        const FINAL_URL = APIConfig?.orderPath?.createOrder;
        const payload = {
            ...orderDetails,
            payment_method: ORDER_TYPE.ONLINE_ORDER,
        };

        const response = await postApiRequestWrapper(FINAL_URL, payload);

        // if (response && response?.success === true && response?.error === false) {
        //     navigate("/order-success");
        //     return;
        // };

        // showErrorToast(response?.message || "Cant place the order.");

    };

    useEffect(() => {
        fetchCartDetails();
        fetchAddressDetails();
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
                            {allAddresses?.map((address) => {
                                const isSelected = orderDetails.delivery_address === address._id;

                                return (
                                    <div
                                        key={address._id}
                                        className={`address-card ${isSelected ? "selected" : ""}`}
                                        onClick={() =>
                                            setOrderDetails((prev) => ({
                                                ...prev,
                                                delivery_address: address._id,
                                            }))
                                        }
                                    >
                                        <div className="address-left">
                                            <div className="top-row">
                                                <span className="name">{address.receiver_name}</span>
                                                <span className="tag">{address.addressType}</span>
                                            </div>

                                            <p className="line">
                                                {address.address_line}, {address.city}
                                            </p>

                                            <p className="line">
                                                {address.state} - {address.pin}, {address.country}
                                            </p>

                                            <p className="mobile">📞 {address.mobile}</p>
                                        </div>

                                        <div className="address-right">
                                            <span className="radio" />
                                        </div>
                                    </div>
                                );
                            })}

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
                            <button className="text-size-4 checkout-button" onClick={handleOnlinePayment}>Pay Online</button>
                        </div>

                        <div className="checkout-button-container">
                            <button className="text-size-4 checkout-button" onClick={handleCashOnDelivery}>Cash on delivery</button>
                        </div>

                    </div>

                </div>

            </section>
        </main>
    );
};

export default Checkout;