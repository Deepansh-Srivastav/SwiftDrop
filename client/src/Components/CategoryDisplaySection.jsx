import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const CategoryDisplaySection = ({
  category_id,
  name,
  banner = 'https://res.cloudinary.com/dqo7vuizb/image/upload/v1763464071/SwiftDrop/ybljtd4o9cagyghv23cs.png',
  data,
  path = "/"
}) => {

  let parallaxStyle = { backgroundImage: `url(${banner})` };

  const navigate = useNavigate();

  return (
    <section className="display-category-section">

      <div style={parallaxStyle} className="parallax-container">
        <p className="text-size-1">

          {name || "Swift Drop Product"}
        </p>
      </div>

      <div className="product-container">
        <div className="products-wrapper">
          {data?.map((item, index) => {
            return (
              <ProductCard {...item} key={index} />
            )
          })}
        </div>
      </div>

      <div className="see-all-button">
        <button onClick={() => navigate(path)}>... See All ...</button>
        {/* <button onClick={() => navigate("/my-account")}>... See All ...</button> */}
      </div>

    </section>
  );
};

export default CategoryDisplaySection;