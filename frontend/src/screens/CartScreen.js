import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  /*
  ? Nota:
  * split('=') value [1], get the second value of 'index'.
  * get "qty" data finding, from URL: `/cart/${productId}?qty=${qty}`
  * qty "?" return rendering a number of quantity.
  */

  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  //! Console
  console.log("Cart Screen url qty:", props.location.search, "\nNum qty:", qty);

  //? Get cart from redux store.
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  /*
  ? Nota:
  * Call action 'add to cart'
  * If product 'id' exist, dispatch action & set 'productId' and 'qty'.
  */
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  //? Remove cart item button
  const removeFromCartHandler = (id) => {
    // Delete action
  };

  //? Checkout cart item button
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="row top">
      <div className="col-2">
        {/* Cart items title */}
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          //* Message for cart empty.
          <MessageBox>
            Cart is empty. <Link to="/">Go shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  {/* Product image */}
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  {/* Product name */}
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  {/* Select quantity menu */}
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Product price */}
                  <div>${item.price}</div>
                  {/* Delete item button */}
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            {/* Subtotal cart items & price information */}
            <li>
              <h2>
                {/* 
                  //? Nota:
                  //* Params: a = "Accumulator Item", c = "Current Item".
                  //* Calculate total number items = 'a + c.qty'.
                  //* Calculate total price items = 'a + c.price * c.qty'.
                  //? Default total: for item & price = 0.
                  */}
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            {/* Checkout item button */}
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                //* Disabled for empty cart
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
