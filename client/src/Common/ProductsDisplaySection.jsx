

const ProductsDisplaySection = ({ heading, products, image }) => {
    return (
        <section>

            <Parallax heading={heading} image={image} />

            <div className="bakery-container">
                {products.map((product) => (
                    <div className="bakery-card" key={product.id}>
                        <img
                            src={`/images/${product.image}`} // make sure images are in public/images/
                            alt={product.name}
                            className="bakery-image"
                        />
                        <h3 className="bakery-name">{product.name}</h3>
                        <p className="bakery-unit">{product.unit}</p>
                        <p className="bakery-price">₹{product.price.toFixed(2)}</p>
                        <p className="bakery-discount">Discount: {product.discount}</p>
                        <p className="bakery-preptime">Prep Time: {product.prepTime}</p>
                    </div>
                ))}
            </div>

        </section>
    )
}

export default ProductsDisplaySection


const Parallax = ({ heading, image }) => {
    const parallaxStyle = {
        height: "30vh",
        backgroundImage: `url(${image})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
    };

    const overlayStyle = {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${image})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        filter: "brightness(0.6)",
        zIndex: -1,
    };

    return (
        <div style={parallaxStyle}>
            <div style={overlayStyle}></div>
            <p className="text-size-1">{heading}</p>
        </div>
    );
};

