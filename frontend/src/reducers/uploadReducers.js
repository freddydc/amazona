import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL,
  IMAGE_UPLOAD_RESET,
} from "../constants/uploadConstants";

/* ==> ( UPLOAD IMAGE ) <== */
export const imageUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_REQUEST:
      return { loading: true };
    case IMAGE_UPLOAD_SUCCESS:
      return { loading: false, success: true, image: action.payload };
    case IMAGE_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    case IMAGE_UPLOAD_RESET:
      return {};
    default:
      return state;
  }
};
