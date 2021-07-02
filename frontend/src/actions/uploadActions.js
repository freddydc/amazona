import Axios from "axios";
import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL,
} from "../constants/uploadConstants";

/* ==> ( UPLOAD IMAGE ) <== */
export const uploadImage = (bodyFormData) => async (dispatch, getState) => {
  dispatch({ type: IMAGE_UPLOAD_REQUEST, payload: bodyFormData });
  const {
    userSignIn: { userInfo },
  } = getState();
  /* ( SEND AJAX REQUEST ) */
  try {
    /* ( Axios ) POST.
    ? Second Field:
    *  ( bodyFormData ): Payload Request.
    */
    const { data } = await Axios.post("/api/uploads", bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: IMAGE_UPLOAD_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: IMAGE_UPLOAD_FAIL, payload: message });
  }
};
