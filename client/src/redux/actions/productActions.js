import * as actions from "../constants/productContstants";
import axios from "axios";
import {logout} from "./userActions"

// Action Untuk menampilkan list product
export const listProduct =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: actions.PRODUCT_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({ type: actions.PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actions.PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };


  // Action Detail Product
  export const listProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: actions.PRODUCT_DETAILS_RESET})
      dispatch({ type: actions.PRODUCT_DETAILS_REQUEST })

      const { data } = await axios.get(`/api/products/${id}`);

      dispatch({
        type: actions.PRODUCT_DETAILS_SUCCESS,
        payload: data.product
      })
    } catch (error) {
      dispatch({
        type: actions.PRODUCT_DETAILS_FAIL,
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
      })
    }
  }


  // Action create review product
  export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: actions.PRODUCT_CREATE_REVIEW_REQUEST })

      const {
        userLogin : {userInfo}
      } = getState()

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`
        },
      }

      await axios.post(`/api/products/${productId}/reviews`, review, config )

      dispatch({ type: actions.PRODUCT_CREATE_REVIEW_SUCCESS })
    } catch (error) {
      const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message

      if(message === "not authorized, no token") {
        dispatch(logout())
      }
      dispatch({
        type: actions.PRODUCT_CREATE_REVIEW_FAIL,
        payload: message
      })
    }
  }