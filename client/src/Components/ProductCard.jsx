import '../Styles/ProductCard.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductCard = ({
    _id,
    name,
    image,
    unit,
    stock,
    price
}) => {
    return (
        <div className='product-card-container'>

            <div className="card-image-container">
                <img src="https://res.cloudinary.com/dqo7vuizb/image/upload/v1763287453/SwiftDrop/fdtd56d4jli9ysvsjklu.jpg" alt="" loading='lazy' />

                <div className="wishlist-icon-container">
                    <FavoriteBorderIcon />
                </div>
            </div>

            <p>{name}</p>

        </div>
    )
}

export default ProductCard
