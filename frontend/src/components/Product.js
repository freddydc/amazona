import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        {/* Product Title */}
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        {/* Rating Icons */}
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        {/* Product Price */}
        <div className="price">$ {product.price}</div>
      </div>
    </div>
  );
}
