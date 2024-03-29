import * as actions from "../constants/OrderContstans"

// Create Order
export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.ORDER_CREATE_REQUEST:
            return{
                ...state,
                loading: true
            }
        case actions.ORDER_CREATE_SUCCESS:
            return{
                ...state,
                loading: false,
                success: true,
                order: action.payload
            }
        case actions.ORDER_CREATE_FAILED:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


// Order Detail Reducer
export const orderDetailReducer = (
    state = { loading: true, orderItems: [], order: {}, shippingAddress: {}},
    action
) => {
    switch (action.type) {
        case actions.ORDER_DETAILS_REQUEST:
            return{
                ...state,
                loading: true
            }
        case actions.ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                order: action.payload
            }
        case actions.ORDER_DETAILS_FAILED:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


// Order Pay Reducer
export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.ORDER_PAY_REQUEST:
            return{
                ...state,
                loading: true
            }
        case actions.ORDER_PAY_SUCCESS:
            return{
                ...state,
                loading: false,
                success: true
            }
        case actions.ORDER_PAY_FAILED:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case actions.ORDER_PAY_RESET:
            return{}
        default:
            return state;
    }
}


// Order Deliver Reducer
export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.ORDER_DELIVER_REQUEST:
            return{
                ...state,
                loading: true
            }
        case actions.ORDER_DELIVER_SUCCESS:
            return{
                ...state,
                loading: false,
                success: true
            }
        case actions.ORDER_DELIVER_FAILED:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case actions.ORDER_DELIVER_RESET:
            return{}
        default:
            return state;
    }
}


// My Order List
export const orderListMyOrderReducer = (state = { orders: []}, action) => {
    switch (action.type) {
        case actions.ORDER_LIST_MY_REQUEST:
            return{
                ...state,
                loading: true
            }
        case actions.ORDER_LIST_MY_SUCCESS:
            return{
                ...state,
                loading: false,
                orders: action.payload
            }
        case actions.ORDER_LIST_MY_FAILED:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}