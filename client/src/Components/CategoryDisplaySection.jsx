import { useState, useEffect } from "react";
import { bakeryProducts } from "../Assets/DummyData";
import ProductCard from "./ProductCard";

const CategoryDisplaySection = ({
  heading,
  id,
  banner = 'https://res.cloudinary.com/dqo7vuizb/image/upload/v1763464071/SwiftDrop/ybljtd4o9cagyghv23cs.png' }) => {


  let parallaxStyle = { backgroundImage: `url(${banner})` }
  return (
    <section style={{ backgroundColor: "white", marginBottom:"100px" }}>

      <div style={parallaxStyle} className="parallax-container">
        <p className="text-size-1">

          {heading || "Aata Dal & Rice"}
        </p>
      </div>

      <div className="product-container">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
};

export default CategoryDisplaySection;
