import * as actions from "../constants/productContstants";

// Menampilkan List Product
export const productListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case actions.PRODUCT_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actions.PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page
            }
        case actions.PRODUCT_LIST_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}