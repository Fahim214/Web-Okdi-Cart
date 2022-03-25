import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./redux/reducers/cartReducers";
import { orderCreateReducer, orderDeliverReducer, orderDetailReducer, orderPayReducer } from "./redux/reducers/OrderReducers";
import { productDetailsReducer, productListReducer, productReviewCreateReducer } from "./redux/reducers/productReducers";
import { userLoginReducer, userRegisterReducer } from "./redux/reducers/userReducers";

const rootReducers = combineReducers({
    productList: productListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    productDetails: productDetailsReducer,
    productReviewCreate : productReviewCreateReducer,
    orderCreate: orderCreateReducer,
    orderDetail: orderDetailReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    cart: cartReducer
})


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const initialState = {

}

const store = createStore(
    rootReducers,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store