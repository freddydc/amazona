import Axios from "axios";
import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

//* Response actions in src/reducers/productReducers.js
export const listProducts = () => async (dispatch) => {
    dispatch({
        //? type: "action"
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
