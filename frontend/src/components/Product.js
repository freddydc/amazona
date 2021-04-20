import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product(props) {
  const { set_product } = props;
  return (
    //* Image product
    <div key={set_product._id} className="card">
      <Link to={`/product/${set_product._id}`}>
        <img
          className="medium"
          src={set_product.image}
          alt={set_product.name}
        />
      </Link>
      {/* Product name */}
      <div className="card-body">
        <Link to={`/product/${set_product._id}`}>
          <h2>{set_product.name}</h2>
        </Link>

        {/* The rating icons */}
        <Rating
          set_rating={set_product.rating}
          set_numReviews={set_product.numReviews}
        ></Rating>

        <div className="price">$ {set_product.price}</div>
      </div>
    </div>
  );
}
