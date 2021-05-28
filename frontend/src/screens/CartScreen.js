import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  /* ==> split cart-quantity <==
  ? - Split by mark=(=) index [1], get second value of list.
  * - Get (quantity) data by search on URL:
  ?     localhost:3000/cart/${productId}?qty=${qty} by (product-screen).
  * - Quantity by mark=(?) return rendering a (number) of item.
  */
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  //! Info.
  // console.log(`cart-screen url: ${props.location.search} \n Quantity: ${qty}`);

  //? Get cart from (redux store).
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  /* ==> dispatch add-to-cart action <==
  ? - Call (add-to-cart) action.
  * - If product (id) exist, dispatch an action
  *     and set (product-id) and (quantity).
  */
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  /* ==> button remove cart-items <==
  ? - Remove item by (remove-from-cart) action defined.
  */
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  /* ==> button checkout cart-items <==
  ? - User checkout account redirect (url).
  */
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  /* ==> calculate <subtotal item> and price <==
  ? - Params: (a) => (accumulator-item) and (c) => (current-item).
  * - Total quantity item => (a) + (c.qty).
  * - Total price item => (a) + (c.price) * (c.qty).
  ? - Default total: item and price => (0).
  */
  return (
    <div className="row top">
      <div className="col-2">
        {/* Item Title */}
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          //? - Message if cart is (empty).
          <MessageBox>
            Cart is empty. <Link to="/">Go shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  {/* Item Image */}
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  {/* Item Name */}
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  {/* Choose Quantity */}
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
                  {/* Item Price */}
                  <div>${item.price}</div>
                  {/* Remove Item */}
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
            {/* Subtotal Item */}
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            {/* Checkout Item */}
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                //? - Disabled if cart is (empty).
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
