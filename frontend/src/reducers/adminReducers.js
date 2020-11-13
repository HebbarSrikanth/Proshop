import { types } from '../constants/type'

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case types.ADMIN_FETCHUSER_REQUEST: return { loading: true }

        case types.ADMIN_FETCHUSER_SUCCESS: return {
            loading: false,
            users: action.payload
        }

        case types.ADMIN_FETCHUSER_ERROR: return {
            loading: false,
            error: action.payload
        }

        case types.ADMIN_USER_RESET: return { users: [] }

        default: return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case types.ADMIN_DELETEUSER_SUCCESS: return {
            loading: false,
            success: true
        }
        case types.ADMIN_DELETEUSER_REQUEST: return {
            loading: true
        }
        case types.ADMIN_DELETEUSER_ERROR: return {
            loading: false,
            error: action.payload
        }
        default: return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case types.ADMIN_USERPROFILE_REQUEST: return { loading: true }

        case types.ADMIN_USERPROFILE_SUCCESS: return {
            loading: false,
            user: action.payload
        }

        case types.ADMIN_USERPROFILE_ERROR: return {
            loading: false,
            error: action.payload
        }

        default: return state
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {

        case types.ADMIN_EDITUSERPROFILE_REQUEST: return { loading: true }

        case types.ADMIN_EDITUSERPROFILE_SUCCESS: return {
            loading: false,
            success: true
        }

        case types.ADMIN_EDITUSERPROFILE_ERROR: return {
            loading: false,
            error: action.payload
        }

        case types.ADMIN_EDITUSERPROFILE_RESET: return {}
        default: return state
    }
}

export const ordersListReducer = (state = { orderList: [] }, action) => {
    switch (action.type) {
        case types.ADMIN_FETCHORDER_REQUEST: return { loading: true }

        case types.ADMIN_FETCHORDER_SUCCESS: return {
            loading: false,
            orderList: action.payload
        }

        case types.ADMIN_FETCHORDER_ERROR: return {
            loading: false,
            error: action.payload
        }

        default: return state
    }
} 