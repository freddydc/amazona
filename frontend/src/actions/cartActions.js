import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

/*
? Defining an action return (async) function.
* getState: make possible to (get access), to state of (redux store).

* ==> LOCAL STORAGE <==
  ? Maintain saved persistent data (cart items added),
  * ... if web page is (refreshed) again.
  * * Local Storage: setItem('key name custom', value: string)
  ? Get access: (getState().cart.cartItems) from redux thunk,
  * ... by redux (store).
*/
export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  //! Info
  console.log("Add To Cart Action qty:", qty);

  dispatch({
    /*
    ? (payload): important
    * (id) = product
    * (qty): important
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

//* Remove Cart Item.
export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  //? Update (Local Storage) data.
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
