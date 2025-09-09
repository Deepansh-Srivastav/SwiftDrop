import "../Styles/Home.css"

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
        backgroundImage: `url(${image})`,
    };

    const overlayStyle = {
        content: '""',
        backgroundImage: `url(${image})`,
    };

    return (
        <div style={parallaxStyle} className="parallax2">
            <div style={overlayStyle} className="parallax-overlay"></div>
            <p className="text-size-1">{heading}</p>
        </div>
    );
};