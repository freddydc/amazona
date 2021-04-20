import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";

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

  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        Add To Cart: Product Id: {productId} -- Quantity: {qty}
      </p>
    </div>
  );
}
