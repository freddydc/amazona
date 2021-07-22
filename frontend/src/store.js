import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
} from "./reducers/orderReducers";
import {
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import { imageUploadReducer } from "./reducers/uploadReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSignInReducer,
  userTopSellerListReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

/* ==> ( Redux Store ) <== LOCAL STORAGE STATE.
? Default: Data for cart by Local Storage opening browser again.
* Get Item: Using key name = cartItems by Cart action.
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
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
};

/* ==> ( Reducer ) <== SAMPLE.
? Usage without reducer, need import data.js by front to return state = products.
  const reducer = (state, action) => {
    return { products: data.products };
  };
*/

/* ==> ( Redux Store ) <== COMBINE REDUCERS. */
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  imageUpload: imageUploadReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userTopSellerList: userTopSellerListReducer,
  productCategoryList: productCategoryListReducer,
  productReviewCreate: productReviewCreateReducer,
});

/* ==> ( Compose ) <== FUN.
? Compose Enhancer:
*  Upgrade default compose redux fun, to show redux store in browser with plugin.
*/
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
