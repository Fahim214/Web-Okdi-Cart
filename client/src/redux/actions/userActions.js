import axios from "axios";
import * as actions from "../constants/userContstants"


// Action untuk login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: actions.USER_LOGIN_REQUEST })

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        }

        const { data } = await axios.post(
            "/api/users/login",
            { email, password },
            config
        )

        dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: data.user })

        localStorage.setItem("userInfo", JSON.stringify(data.user))
    } catch (error) {
        dispatch({
            type: actions.USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}


// Action untuk logout
export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({ type: actions.USER_LOGOUT })
}


// Action untuk register user
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: actions.USER_REGISTER_REQUEST })

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        }

        const { data } = await axios.post(
            "/api/users/register",
            {
                name,
                email,
                password
            },
            config
        )

        dispatch({ type: actions.USER_REGISTER_SUCCESS, payload: data.user })
        dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: data.user })

        localStorage.setItem("userInfo", JSON.stringify(data.user))
    } catch (error) {
        dispatch({
            type: actions.USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}