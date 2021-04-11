import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;

    //* Get data, from "redux store"
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    //* Nota: Param [] dependencies list, need "product Id"
    useEffect(() => {
        //? Dispatch action "Details Product"
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>
                    {/* Back to home */}
                    <div className="back-home">
                        <Link to="/">
                            <span>
                                <i className="fas fa-angle-left fa-xs"></i>
                            </span>
                            <span>Back to result</span>
                        </Link>
                    </div>
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
                                                    <span className="danger">
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
            )}
        </div>
    );
}
