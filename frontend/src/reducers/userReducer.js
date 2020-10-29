import { types } from '../constants/type'

export const userLoginReducer = (state = {}, action) => {
    switch (types) {

        case types.LOGIN_REQUEST: return {
            loading: true
        }

        case types.LOGIN_SUCCESSFUL: return {
            loading: false,
            userInfo: action.payload
        }

        case types.LOGIN_FAIL: return {
            loading: false,
            error: action.payload
        }

        default: return state
    }
}

