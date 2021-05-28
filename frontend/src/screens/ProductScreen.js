import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  //? - Default state (quantity) value on (1).
  const [qty, setQty] = useState(1);
  //* - Get data from (redux store).
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  /* ==> dispatch (details-product) action <==
   * - Second parameter [list-dependencies] need (product-id).
   */
  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  /* ==> redirect button to (cart-screen) <==
  ? - Button fun (Add-To-Cart)
  *     onClick change url to (Cart-Screen).
  */
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          {/* Back Home */}
          <div className="back-home">
            <Link to="/">
              <span>
                <i className="fas fa-angle-left fa-xs"></i>
              </span>
              <span>Back to result</span>
            </Link>
          </div>
          {/* ==> Card Item-Details <== */}
          <div className="row top">
            {/* Item Image */}
            <div className="col-2">
              <img className="large" src={product.image} alt={product.name} />
            </div>
            <div className="col-1">
              <ul>
                {/* Item Name */}
                <li>
                  <h1>{product.name}</h1>
                </li>
                {/* Rating Stars */}
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                {/* Item Price */}
                <li>price: $ {product.price}</li>
                {/* Item Details */}
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            {/* ==> Card Add-To-Cart <== */}
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  {/* Item Price */}
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">$ {product.price}</div>
                    </div>
                  </li>
                  {/* Item Status */}
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div className="price">
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {/* (button) enabled if (items) is greater than (0) */}
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Quantity</div>
                          {/* Choose Quantity */}
                          <div>
                            {/* TODO: Learn <select> on-change fun (event-target) */}
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {/* TODO: Learn (Spread Syntax) */}
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  //? - Info: {x + 1} for list index (0).
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      {/* Button Add-To-Cart */}
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
