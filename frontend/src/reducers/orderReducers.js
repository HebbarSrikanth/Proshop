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