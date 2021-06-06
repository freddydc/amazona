import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

/* ==> (add-to-cart)  action <==
? Defining an action return (async) function.
* getState: make possible to (get access) to state of (redux store).
? == Local Storage ==
* Maintain saved persistent data (cart items added)
*   if browser page is (refreshed-again).
* Local Storage: setItem('key name custom', value: string)
? Get access: (getState().cart.cartItems)
?   from redux thunk by redux (store).
*/
export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  //! Info.
  // console.log(`Add to cart action quantity: ${qty}`);
  dispatch({
    /* ==> Details <==
    ? - (payload): important.
    * - (id) = product.
    * - (qty = quantity): important.
    */
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

/* ==> (remove-cart-item) action <== */
export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  //? ==> Update (Local-Storage) data information.
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

/* ==> ( save-shipping-address ) action
? - Accept ( dispatch ) parameter from ( redux-thunk ).
*/
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

/* ==> ( save-payment-method ) action <==
? - Not need save pay method on local storage, because not have many fields.
*/
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
