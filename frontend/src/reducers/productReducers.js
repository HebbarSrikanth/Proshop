import { types } from '../constants/type'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case types.PRODUCT_LIST_REQUEST: return {
            loading: true,
            products: []
        }

        case types.PRODUCT_FETCH_SUCCESS: return {
            loading: false,
            products: action.payload.products,
            page: action.payload.page,
            pages: action.payload.pages
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

export const createProductReducer = (state = {}, action) => {
    switch (action.type) {
        case types.PRODUCT_CREATE_REQUEST: return { loading: true }

        case types.PRODUCT_CREATE_SUCCESS: return {
            loading: false,
            success: true,
            productDetail: action.payload
        }

        case types.PRODUCT_CREATE_ERROR: return {
            loading: false,
            error: clientInformation.payload
        }

        case types.PRODUCT_CREATE_RESET: return {}

        default: return state
    }
}

export const updateProductReducer = (state = {}, action) => {
    switch (action.type) {

        case types.PRODUCT_UPDATE_REQUEST: return { loading: true }

        case types.PRODUCT_UPDATE_SUCCESS: return {
            loading: false,
            success: true,
            productDetail: action.payload
        }

        case types.PRODUCT_UPDATE_ERROR: return {
            loading: false,
            error: action.payload
        }

        case types.PRODUCT_UPDATE_RESET: return {}

        default: return state
    }
}

export const insertReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case types.PRODUCT_REVIEW_REQUEST: return { loading: true }

        case types.PRODUCT_REVIEW_SUCCESS: return {
            loading: false,
            success: true,
        }

        case types.PRODUCT_REVIEW_ERROR: return {
            loading: false,
            error: action.payload
        }

        case types.PRODUCT_REVIEW_RESET: return {}

        default: return state
    }
}

export const topProductReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case types.TOP_PRODUCTS_REQUEST: return { loading: true, products: [] }

        case types.TOP_PRODUCTS_SUCCESS: return {
            loading: false,
            products: action.payload
        }

        case types.TOP_PRODUCTS_ERROR: return {
            loading: false,
            error: action.payload
        }

        default: return state;
    }
}