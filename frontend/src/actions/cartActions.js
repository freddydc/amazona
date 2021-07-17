import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

/* ==> ( Add Cart ) <==
? Get State: Makes possible get state from redux store
*  getState().cart.cartItems, by redux thunk.
? Local Storage: setItem('Custom Key Name', value: string)
*/
export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  const {
    cart: { cartItems },
  } = getState();
  if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
    const sellerName = cartItems[0].seller.seller.name;
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: `Cannot add to cart. Buy only from ${sellerName} in this order.`,
    });
  } else {
    //? id: product, qty: quantity = important.
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        seller: data.seller,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  }
};

/* ==> ( Remove Item ) <== */
export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  //? Local Storage: Update data information.
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

/* ==> ( Shipping Address ) <== */
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

/* ==> ( Payment Method ) <==
? Local Storage: Not need save pay method because not have many fields.
*/
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
