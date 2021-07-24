import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_SUMMARY_REQUEST,
  ORDER_SUMMARY_SUCCESS,
  ORDER_SUMMARY_FAIL,
} from "../constants/orderConstants";

/* ==> ( CREATE ORDER ) <==
? Fields: Dispatch and getState by: ( redux thunk ).
*/
export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  /* ( SEND AJAX REQUEST ) */
  try {
    /* ( User ) TOKEN.
    ? Get ( User Info ) token from redux store by ( User Sign In ).
    ? getState(): return all redux store.
    */
    const {
      userSignIn: { userInfo },
    } = getState();
    /* ( Axios ) POST.
    ? Parameters:
    *  Second: ( order ) Request Payload.
    *  Third: ( headers : {} ) Options.
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

/* ==> ( ORDER DETAILS ) <== */
export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignIn: { userInfo },
  } = getState();
  /* ( SEND AJAX REQUEST ) */
  try {
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

/* ==> ( PAY ORDER ) <== */
export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
    const {
      userSignIn: { userInfo },
    } = getState();
    /* ( SEND AJAX REQUEST ) */
    try {
      /* ( Axios ) PUT.
      ? Field:
      *  Second parameter: ( Payment Result ) = Payload Request.
      */
      const { data } = await Axios.put(
        `/api/orders/${order._id}/pay`,
        paymentResult,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_PAY_FAIL, payload: message });
    }
  };

/* ==> ( ORDER MINE ) <==
? Accept Fields: ( Dispatch And Get State ) from redux thunk.
*/
export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });
  const {
    userSignIn: { userInfo },
  } = getState();
  /* ( SEND AJAX REQUEST ) */
  try {
    const { data } = await Axios.get("/api/orders/mine", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
  }
};

/* ==> ( ORDER LIST ) <== */
export const listOrders =
  ({ seller = "" }) =>
  async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    /* ( SEND AJAX REQUEST ) */
    try {
      const { data } = await Axios.get(`/api/orders?seller=${seller}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      console.log(data); //! info.
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_LIST_FAIL, payload: message });
    }
  };

/* ==> ( DELETE ORDER ) <== */
export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
  const {
    userSignIn: { userInfo },
  } = getState();
  /* ( SEND AJAX REQUEST ) */
  try {
    const { data } = await Axios.delete(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELETE_FAIL, payload: message });
  }
};

/* ==> ( DELIVER ORDER ) <== */
export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
  const {
    userSignIn: { userInfo },
  } = getState();
  /* ( SEND AJAX REQUEST ) */
  try {
    /* ( Axios ) PUT.
    ? Second Field:
    *  {}: Payload Request.
    */
    const { data } = await Axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
  }
};

/* ==> ( Order Summary ) <== */
export const summaryOrder = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_SUMMARY_REQUEST });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/orders/summary", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_SUMMARY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_SUMMARY_FAIL, payload: message });
  }
};
