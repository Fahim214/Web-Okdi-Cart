import * as actions from "../constants/userContstants";

// User Login
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case actions.USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actions.USER_LOGOUT:
      return {
        userInfo: null,
      };
    default:
      return state;
  }
};

// User register reducer
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actions.USER_REGISTER_SUCCESS:
      return{
        ...state,
        loading: false,
        userInfo: action.payload
      }
    case actions.USER_REGISTER_FAIL:
      return{
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}
