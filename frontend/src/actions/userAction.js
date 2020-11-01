import Axios from 'axios'
import { types } from '../constants/type'

export const login = (email, password) => async (dispatch) => {
    dispatch({
        type: types.LOGIN_REQUEST
    })

    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const { data } = await Axios.post(`/user/login`, { email, password }, config)
        dispatch({
            type: types.LOGIN_SUCCESSFUL,
            payload: data
        })
        //Store the user details into the local storage
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        console.log(err)
        dispatch({
            type: types.LOGIN_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message
        })
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: types.LOGOUT })
    localStorage.removeItem('userInfo')
}

export const register = (userInfo) => async (dispatch) => {
    try {
        const { name, email, password } = userInfo
        let phone = Number(userInfo.phone)
        dispatch({ type: types.REGISTER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await Axios.post(`/user/register`, { name, email, phone, password }, config)

        //For the state of user register but at the same time we have set the user login also to success
        dispatch({
            type: types.REGISTER_SUCCESS,
            payload: data
        })

        //Login successful state has to be set
        dispatch({
            type: types.LOGIN_SUCCESSFUL,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        console.log(err)
        dispatch({
            type: types.REGISTER_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message
        })
    }
}

export const fetchProfileDetails = (id) => async (dispatch, getState) => {

    try {
        dispatch({ type: types.PROFILE_REQUEST })

        //Get the token value using getState which will fetch the golbal state that is present
        const token = getState().userLogin.userInfo.token

        //Then add the token in header for further authoriztion
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await Axios.get(`/user/${id}`, config)

        dispatch({
            type: types.PROFILE_SUCCESSFUL,
            payload: data
        })
    } catch (err) {
        console.log('Error while fetching the profile details')
        console.log(err)
        dispatch({
            type: types.PROFILE_ERROR,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message
        })
    }
}

export const updateUserProfile = ({ name, email, phone, password }) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.UPDATE_PROFILE_REQUEST })

        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await Axios.put('/user/profile', { name, email, phone, password }, config)

        dispatch({
            type: types.UPDATE_PROFILE_SUCCESS,
            payload: data
        })

    } catch (err) {
        console.log('Error while updating the user profile details')
        console.log(err)
        dispatch({
            type: types.UPDATE_PROFILE_ERROR,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message
        })
    }
}