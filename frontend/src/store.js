import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import {
  userRegisterReducer,
  userSignInReducer,
} from "./reducers/userReducers";

/* ==> (redux-store) initial state on (local-storage) <==
* == cart ==
? - Default data for (cart) by (local storage) opening browser again.
* - getItem: using (key name cartItems), by cart action.
*/
const initialState = {
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
/* ==> without-reducer <==
? - For use without (reducers), need import (data.js by front)
*     for return (state) = products.
? - state: before = (empty), later have: (products data).
* - action: type = (@Init).

  const reducer = (state, action) => {
    return { products: data.products };
  };
*/

//? ==> Redux-Store for combine (reducers).
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
});

/* <== compose-fun <==
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
