import { types } from '../constants/type'
import Axios from 'axios'

export const fetchUserList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ADMIN_FETCHUSER_REQUEST })

        const token = getState().userLogin.userInfo ? getState().userLogin.userInfo.token : ''

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await Axios.get('/admin/userlist', config)

        dispatch({
            type: types.ADMIN_FETCHUSER_SUCCESS,
            payload: data
        })
    } catch (err) {
        console.log('Error while fetching the user for the admin')
        dispatch({
            type: types.ADMIN_FETCHUSER_ERROR,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ADMIN_DELETEUSER_REQUEST })

        const token = getState().userLogin.userInfo ? getState().userLogin.userInfo.token : ''

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await Axios.delete('/admin/user/' + id, config)

        dispatch({
            type: types.ADMIN_DELETEUSER_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: types.ADMIN_DELETEUSER_ERROR,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message
        })
    }
}

export const fetchUserProfile = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ADMIN_USERPROFILE_REQUEST })
        const token = getState().userLogin.userInfo ? getState().userLogin.userInfo.token : ''
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await Axios.get(`/admin/user/${id}/edit`, config)
        dispatch({
            type: types.ADMIN_USERPROFILE_SUCCESS,
            payload: data
        })
    } catch (err) {
        console.log('Error while fetching individual user profile for admin')
        dispatch({
            type: types.ADMIN_USERPROFILE_ERROR,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message
        })
    }
}

export const updateUserProfile = (id, profile) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ADMIN_EDITUSERPROFILE_REQUEST })
        const token = getState().userLogin.userInfo ? getState().userLogin.userInfo.token : ''
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }

        const { data } = await Axios.put(`/admin/user/${id}/edit`, profile, config)

        dispatch({
            type: types.ADMIN_EDITUSERPROFILE_SUCCESS
        })
        dispatch({
            type: types.ADMIN_USERPROFILE_SUCCESS,
            payload: data
        })

    } catch (err) {
        console.log('Error while updating individual user profile for admin')
        dispatch({
            type: types.ADMIN_EDITUSERPROFILE_ERROR,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message
        })
    }
}


export const fetchOrders = () => async (dispatch, getState) => {
    console.log('Here')
    try {
        dispatch({ type: types.ADMIN_FETCHORDER_REQUEST })

        const token = getState().userLogin ? getState().userLogin.userInfo.token : 'null'

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await Axios.get('/admin/orders', config)

        dispatch({
            type: types.ADMIN_FETCHORDER_SUCCESS,
            payload: data
        })

    } catch (err) {
        console.log('Error while fetch the order details')
        dispatch({
            type: types.ADMIN_FETCHORDER_ERROR,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message
        })
    }
}