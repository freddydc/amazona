import React from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import data from "../data";

export default function ProductScreen(props) {
    // Evaluate product "id" to equal props "id"
    const product = data.products.find((x) => x._id === props.match.params.id);

    // Console
    // console.log("product: ", product);
    // console.log("props: ", props);

    // Product doesn't exist use "!" before
    if (!product) {
        return <div>Product not found</div>;
    }
    // Product exist
    return (
        <div>
            {/* Back to home */}
            <Link to="/">Back to result</Link>
            <div className="row top">
                <div className="col-2">
                    <img
                        className="large"
                        src={product.image}
                        alt={product.name}
                    />
                </div>
                <div className="col-1">
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating
                                set_rating={product.rating}
                                set_numReviews={product.numReviews}
                            ></Rating>
                        </li>
                        <li>price: $ {product.price}</li>
                        <li>
                            Description:
                            <p>{product.description}</p>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className="price">
                                        $ {product.price}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div className="price">
                                        {product.countInStock > 0 ? (
                                            <span className="success">
                                                In Stock
                                            </span>
                                        ) : (
                                            <span className="error">
                                                Unavailable
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button className="primary block">
                                    Add to cart
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
