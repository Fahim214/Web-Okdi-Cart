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


// User Detail reducer
export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.USER_DETAIL_REQUEST:
      return{
        ...state,
        loading: true
      }
    case actions.USER_DETAIL_SUCCESS:
      return{
        ...state,
        loading: false,
        user: action.payload
      }
    case actions.USER_DETAIL_FAIL:
      return{
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}


// Update Profile Reducer
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.USER_UPDATE_PROFILE_REQUEST:
      return{
        ...state,
        loading: true
      }
    case actions.USER_UPDATE_PROFILE_SUCCESS:
      return{
        ...state,
        loading: false,
        error: null,
        successUpdate: true,
        user: action.payload
      }
    case actions.USER_UPDATE_PROFILE_FAIL:
      return{
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}


// User List Reducer
export const userListReducer = (state = {users: []}, action) => {
  switch (action.type) {
    case actions.USER_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actions.USER_LIST_SUCCESS:
      return{
        ...state,
        loading: false,
        users: action.payload
      }
    case actions.USER_LIST_FAIL:
      return{
        ...state,
        loading: false,
        error: action.payload
      }
    case actions.USER_LIST_RESET:
      return{
        ...state,
        users: []
      }
    default:
      return state;
  }
}


// User delete reducer
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.USER_DELETE_REQUEST:
      return{
        ...state,
        loading: true
      }
    case actions.USER_DELETE_SUCCESS:
      return{
        ...state,
        loading: false,
        success: true
      }
    case actions.USER_DELETE_FAIL:
      return{
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}


// User Update Reducer
export const userUpdateReducer = (state = {}, action) => {
  switch (action.payload) {
    case actions.USER_UPDATE_REQUEST:
      return{
        ...state,
        loading: true
      }
    case actions.USER_UPDATE_SUCCESS:
      return{
        ...state,
        loading: false,
        success: true
      }
    case actions.USER_UPDATE_FAIL:
      return{
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}