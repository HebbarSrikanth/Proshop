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

export const userProfileReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case types.PROFILE_REQUEST: return {
            ...state,
            loading: true
        }

        case types.PROFILE_SUCCESSFUL: return {
            loading: false,
            user: action.payload
        }

        case types.PROFILE_ERROR: return {
            loading: false,
            error: action.payload
        }

        default: return state;
    }
}

export const profileUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case types.UPDATE_PROFILE_REQUEST: return { loading: true }

        case types.UPDATE_PROFILE_SUCCESS: return {
            loading: false,
            userInfo: action.payload,
            success: true
        }

        case types.UPDATE_PROFILE_ERROR: return {
            loading: false,
            success: false,
            error: action.payload
        }
        default: return state
    }
}

