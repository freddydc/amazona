import React from "react";
import Rating from "./Rating";

export default function Product(props) {
    const { set_product } = props;
    return (
        <div key={set_product._id} className="card">
            <a href={`/product/${set_product._id}`}>
                <img
                    className="medium"
                    src={set_product.image}
                    alt={set_product.name}
                />
            </a>
            <div className="card-body">
                <a href={`/product/${set_product._id}`}>
                    <h2>{set_product.name}</h2>
                </a>

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
