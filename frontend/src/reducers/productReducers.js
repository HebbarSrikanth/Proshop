import { types } from '../constants/type'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case types.PRODUCT_LIST_REQUEST: return {
            loading: true,
            products: []
        }

        case types.PRODUCT_FETCH_SUCCESS: return {
            loading: false,
            products: action.payload
        }

        case types.PRODUCT_FETCH_ERROR: return {
            loading: false,
            error: action.payload
        }

        default: return state
    }
}

export const individualProductReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case types.PRODUCT_DETAIL_REQUEST: return {
            loading: true,
            state: {
                product: { review: [] }
            }
        }

        case types.PRODUCT_DETAIL_FETCH_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }

        case types.PRODUCT_DETAIL_FETCH_ERROR: return {
            loading: false,
            error: action.payload
        }

        default: return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case types.ADMIN_PRODUCTDELETE_REQUEST: return { loading: true }

        case types.ADMIN_PRODUCTDELETE_SUCCESS: return {
            loading: false,
            success: true
        }

        case types.ADMIN_PRODUCTDELETE_ERROR: return {
            loading: false,
            error: action.payload
        }

        default: return state
    }
}