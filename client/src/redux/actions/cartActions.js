import axios from "axios"
import * as actions from "../constants/cartContstants";


// Tambah Keranjang
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: actions.CART_ADD_ITEM,
        payload: {
            product: data.product._id,
            name: data.product.name,
            image: data.product.image,
            price: data.product.price,
            countInStock : data.product.countInStock,
            qty,
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}


// Hapus Keranjang
export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: actions.CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}


// Menyimpan Alamat / Shipping Address
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: actions.CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem("shippingAddress", JSON.stringify(data))
}


// Menyimpan Metode Pembayaran
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: actions.CART_SAVE_PAYMENT_METHOD, payload: data })

    localStorage.setItem("paymentMethod", JSON.stringify(data))
}

// Reset Cart
export const cartReset = () => (dispatch) => {
    dispatch({
      type: actions.CART_RESET,
    });
    localStorage.removeItem("cartItems");
  };