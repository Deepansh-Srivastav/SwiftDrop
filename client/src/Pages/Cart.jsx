import BackButton from "../Common/BackButton";
import "../Styles/Cart.css";
import { useNavigate } from "react-router-dom";
import { Divider } from '@mui/material'

const Cart = () => {
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
                            <CartProductCard />
                            <Divider sx={{ width: "100%" }} />
                            <CartProductCard />
                            <Divider sx={{ width: "100%" }} />
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


function CartProductCard() {
    return (
        <article className="cart-product-card-wrapper">

            <div className="cart-product-card-info-container">
                <p className="text-size-2">Fortune Chakki Fresh (100% Atta, 0% Maida) Atta</p>
                <p className="text-size-3">₹500</p>
                <p className="text-size-3">5kg</p>
                -1+
            </div>

            <div className="cart-product-card-image-container">
                <img src="https://res.cloudinary.com/dqo7vuizb/image/upload/v1763287453/SwiftDrop/fdtd56d4jli9ysvsjklu.jpg" alt="" />
            </div>

        </article>
    )
}
