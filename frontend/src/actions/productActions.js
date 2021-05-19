import Axios from "axios";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  dispatch({
    //? type: "Action description"
    //? payload: "Action data information"
    type: PRODUCT_LIST_REQUEST,
  });

  //* Fetch data from backend
  try {
    const { data } = await Axios.get("/api/products");
    //? Dispatching "action", change "state" redux
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

//* Response "actions" in "reducers"
export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });

  //* Nota: For detect error in backend
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        //* Nota: "?", render: "message" from server "Product Not Found".
        //* Nota: ":", render: general error "message", error 404.
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
