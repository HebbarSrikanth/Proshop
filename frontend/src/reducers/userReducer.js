import { types } from '../constants/type'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {

        case types.LOGIN_REQUEST: return {
            loading: true
        }

        case types.LOGIN_SUCCESSFUL:
            return {
                loading: false,
                userInfo: action.payload
            }

        case types.LOGIN_FAIL: return {
            loading: false,
            error: action.payload
        }

        case types.LOGOUT: return {}

        default: return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {

        case types.REGISTER_REQUEST: return { loading: true }

        case types.REGISTER_SUCCESS: return { loading: false, userInfo: action.payload }

        case types.REGISTER_FAIL: return { loading: false, error: action.payload }

        default: return state;
    }
}

