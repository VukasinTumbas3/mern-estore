import React, { useEffect, useState } from "react";
import axios from "axios"; // za fetch produkta iz bek-enda
import Slider from "react-slick";
import "./ProductList.css";

const ProductList = ({ addToCart }) => {
  // state za listu produkta
  const [products, setProducts] = useState([]);

  // fetch za produkt data iz API kad se komponent mountuje
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data)) // storuje fetchovane produkte
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px", // Optional: Removes side spacing
  };

  return (
    <div className="product-slider-container">
      <Slider {...settings}>
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>
              <strong>${product.price}</strong>
            </p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductList;
