import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";

const initialState = {
  /*
  ? Default data for (cart) by (local storage) opening browser again.
  * getItem: using (key name cartItems), by cart action.
  */
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

/*
? Use without (reducers), need import (data.js by front)
* ... for return (state) = products.
? state: before = (empty), later have: (products data).
* action: type = (@INIT).

  const reducer = (state, action) => {
    return { products: data.products };
  };
*/

//? Redux store from (reducers).
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

/*
? (composeEnhancer) upgrade default (compose redux fun),
* ... to show (redux store) on browser.
*/
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
