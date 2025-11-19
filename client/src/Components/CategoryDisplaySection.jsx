import { useState, useEffect } from "react";
import { bakeryProducts } from "../Assets/DummyData";

const CategoryDisplaySection = ({
  heading,
  id,
  banner = 'https://res.cloudinary.com/dqo7vuizb/image/upload/v1763464071/SwiftDrop/ybljtd4o9cagyghv23cs.png' }) => {


  let parallaxStyle = { backgroundImage: `url(${banner})` }
  return (
    <section>

      <div style={parallaxStyle} className="parallax-container">
        <p className="text-size-1">

          {heading || "Aata Dal & Rice"}
        </p>
      </div>


      <div className="bakery-container">
        {bakeryProducts.map((product) => (
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
  );
};

export default CategoryDisplaySection;
