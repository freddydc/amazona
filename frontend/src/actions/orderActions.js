import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from "../constants/orderConstants";

//? - Fields: dispatch and getState by ( redux thunk ).
export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  /* ==> ( SEND AJAX REQUEST ) <== */
  try {
    /* ==> ( User Info ) field <==
    ? - Get ( user-info ) token from redux store by ( user-sign-in ).
    ? - getState(): return all redux store.
    */
    const {
      userSignIn: { userInfo },
    } = getState();
    /* ==> ( Axios Post ) <==
    ? - Parameters:
    ?    - Second: ( order ) is request payload.
    ?    - Third: ( headers : {} ) is for options.
    */
    const { data } = await Axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    // console.log(data); //! Info.
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
