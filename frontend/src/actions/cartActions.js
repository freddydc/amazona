import Axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants";

/*
? Note:
* Defining an action return 'async' function.
* getState: make possible to get access, to state of redux store.
*/
export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  //! Console
  console.log("Add To Cart Action qty:", qty);

  //* Dispatch action
  dispatch({
    /*
    ? Note:
    * 'Payload': important
    * 'Id' = product
    * 'qty': important
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
  /*
  ? Nota:
  * Maintain saved persistent data 'cart items added', if web page is 'refreshed' later.
  * Local Storage: setItem('key name custom', value: string)
  * Get access: 'getState().cart.cartItems' from redux thunk, by redux 'store'.
  */
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
