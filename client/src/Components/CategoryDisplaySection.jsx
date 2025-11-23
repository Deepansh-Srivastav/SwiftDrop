import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const CategoryDisplaySection = ({
  category_id,
  name,
  banner = 'https://res.cloudinary.com/dqo7vuizb/image/upload/v1763464071/SwiftDrop/ybljtd4o9cagyghv23cs.png',
  data
}) => {


  let parallaxStyle = { backgroundImage: `url(${banner})` }
  return (
    <section style={{ backgroundColor: "white", marginBottom: "100px" }}>

      <div style={parallaxStyle} className="parallax-container">
        <p className="text-size-1">

          {name || "Aata Dal & Rice"}
        </p>
      </div>

      <div className="product-container">
        {data?.map((item, index) => {
          return (
            <ProductCard {...item} key={index} />
          )
        })}
      </div>
    </section>
  );
};

export default CategoryDisplaySection;
