import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productListReducer } from "./redux/reducers/productReducers";
import { userLoginReducer } from "./redux/reducers/userReducers";

const rootReducers = combineReducers({
    productList: productListReducer,
    userLogin: userLoginReducer
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