import * as actions from "../constants/OrderContstans";
import axios from "axios";
import { logout } from "./userActions";

// Fungsi Create Order
export const createOrder = (dataOrder) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/orders", dataOrder, config);

    dispatch({ type: actions.ORDER_CREATE_SUCCESS, payload: data.order });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, no token") {
      dispatch(logout());
    }

    dispatch({
      type: actions.ORDER_CREATE_FAILED,
      payload: message,
    });
  }
};

// Action Get order detail
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({ type: actions.ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not Authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_DETAILS_FAILED,
      payload: message,
    });
  }
};

// Action Pay Order
export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: actions.ORDER_PAY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({ type: actions.ORDER_PAY_SUCCESS, payload: data.order });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === "Not authorized, no token") {
        dispatch(logout());
      }

      dispatch({
        type: actions.ORDER_PAY_FAILED,
        payload: message,
      });
    }
  };


// Action Order Deliver
export const deliverOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.ORDER_DELIVER_REQUEST })

        const {
            userLogin : {userInfo},
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(`/api/orders/${orderId}/deliver`, {}, config)

        dispatch({ type: actions.ORDER_DELIVER_SUCCESS })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message

        if(message === "not authorized, no token") {
            dispatch(logout())
        }
        dispatch({
            type: actions.ORDER_DELIVER_FAILED,
            payload: message
        })
    }
}


// Action List My Orders
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_LIST_MY_REQUEST })

    const {
      userLogin: {userInfo},
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get("/api/orders/myorders", config)

    dispatch({ type: actions.ORDER_LIST_MY_SUCCESS, payload: data.orders})
  } catch (error) {
    const message =
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message

    if(message === "Not Authorized, no token") {
      dispatch(logout())
    }

    dispatch({
      type: actions.ORDER_LIST_MY_FAILED,
      payload: message
    })
  }
}