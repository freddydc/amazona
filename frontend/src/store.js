import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { userSignInReducer } from "./reducers/userReducers";

//* - Initial (redux store) state on (Local Storage).
const initialState = {
  /* ==> cart <==
  ? - Default data for (cart) by (local storage) opening browser again.
  * - getItem: using (key name cartItems), by cart action.
  */
  userSignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

/* ==> sample <==
? - Use without (reducers), need import (data.js by front)
*     for return (state) = products.
? - state: before = (empty), later have: (products data).
* - action: type = (@INIT).

  const reducer = (state, action) => {
    return { products: data.products };
  };
*/

//? - Redux store for (reducers).
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignIn: userSignInReducer,
});

/* <== compose fun <==
? - (composeEnhancer) upgrade default (compose redux fun),
*     to show (redux store) on (browser) plugin.
*/
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
