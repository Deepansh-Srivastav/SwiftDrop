import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
const NoProductsAvailable = ({ message = "No products available" }) => {
    return (
        <div className="no-products-container">
            <SentimentDissatisfiedIcon className="no-products-icon" />
            <h3 className="no-products-title">{message}</h3>
            <p className="no-products-subtext">Try selecting another category</p>
        </div>
    )
}

export default NoProductsAvailable;
