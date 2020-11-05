import { types } from '../constants/type'

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case types.PLACEORDER_REQUEST: return { loading: true }

        case types.PLACEORDER_ERROR: return {
            loading: false,
            error: action.payload
        }

        case types.PLACEORDER_SUCCESS: return {
            loading: false,
            order: action.payload,
            success: true
        }
        default: return state
    }
}

export const orderDetailsReducer = (state = { orderItems: [], loading: true }, action) => {
    switch (action.type) {
        case types.FETCHORDER_REQUEST: return {
            ...state,
            loading: true
        }

        case types.FETCHORDER_SUCCESS: return {
            loading: false,
            order: action.payload
        }

        case types.FETCHORDER_ERROR: return {
            loading: false,
            error: action.payload
        }

        default: return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case types.PAYMENT_REQUEST: return { loading: true }

        case types.PAYMENT_SUCCESS: return {
            loading: false,
            success: true
        }

        case types.PAYMENT_ERROR: return {
            loading: false,
            error: action.payload
        }

        case types.PAYMENT_RESET: return {}

        default: return state
    }
}