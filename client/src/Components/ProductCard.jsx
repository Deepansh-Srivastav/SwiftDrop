import '../Styles/ProductCard.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector, useDispatch } from "react-redux";
import { postApiRequestWrapper } from "../Networking/Services/ApiCalls";
import { APIConfig } from "../Networking/Configuration/ApiConfig";
import { showErrorToast, showSuccessToast } from "../Components/CostomAlert.jsx";

const ProductCard = ({
    _id,
    name,
    image,
    unit,
    stock,
    price,
    finalPrice,
    discount,
}) => {

    const userData = useSelector((state) => {
        return state.userDetails
    });

    const isUserLoggedIn = userData && Object.keys(userData).length > 0;


    const finalPriceRounded = Math.round(finalPrice);

    async function upsertUserCart(productId) {
        const data = [
            {
                productId
            }
        ];

        const CART_URL = APIConfig?.cartItemPath?.addCartItem;

        const response = await postApiRequestWrapper(CART_URL, { payload: data });
        if (response && response?.error === false && response?.success === true) {
            return showSuccessToast(response?.message || "Item added to cart.");
        }
        return showSuccessToast(response?.message || "Failed to add this item .");
    };

    function handleAddToCart() {
        const payload = {
            productId: _id,
            name: name,
            unit: unit,
            price: price,
            finalPrice: finalPriceRounded,
            discount: discount,
            image: [image[0]],
            quantity: 1
        };

        if (isUserLoggedIn) {
            upsertUserCart(_id);
            return;
        }
        else {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existingItem = cart.find((item) => {
                return item?.productId === payload?.productId;
            })

            if (existingItem) {
                existingItem.quantity += 1;
            }
            else {
                cart.push(payload);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            showSuccessToast("Item added to cart.");

        };
    };

    return (
        <div className='product-card-container'>

            <div className="card-image-container">
                <img src={image[0]} alt="" loading='lazy' />

                <div className="wishlist-icon-container">
                    <FavoriteBorderIcon />
                </div>

                <span className='sub-category-badge discount-badge'>{discount}% dicount</span>
                <span className='sub-category-badge delhivery-badge'>10 min</span>
            </div>

            <div className="product-card-info-container">
                <p className='text-size-3 product-name'>{name}</p>
                <p className='unit-badge'>{unit}</p>
            </div>

            <div className="product-card-footer">

                <div className="add-to-cart" >
                    <button onClick={handleAddToCart}>🛒 Add</button>
                </div>

                <div className="price-container">
                    <span className='price'>₹{price}</span>
                    <span className='final-price'>₹{finalPriceRounded}</span>
                </div>

            </div>

        </div>
    )
}

export default ProductCard
