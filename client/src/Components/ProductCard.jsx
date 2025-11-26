import '../Styles/ProductCard.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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


    const finalPriceRounded = Math.round(finalPrice);


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

                <div className="add-to-cart">
                    <button>🛒 Add</button>
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
