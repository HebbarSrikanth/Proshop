export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'PRODUCT_LIST_REQUEST': return {
            loading: true,
            products: []
        }

        case 'PRODUCT_FETCH_SUCCESS': return {
            loading: false,
            products: action.payload
        }

        case 'PRODUCT_FETCH_ERROR': return {
            loading: false,
            error: action.payload
        }

        default: return state
    }
}

export const individualProductReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case 'PRODUCT_REQUEST': return {
            loading: true,
            ...state
        }

        case 'FETCH_SUCCESS': return {
            loading: false,
            product: action.payload
        }

        case 'FETCH_ERROR': return {
            loading: false,
            error: action.payload
        }

        default: return state
    }
}