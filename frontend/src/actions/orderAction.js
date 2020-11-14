import { types } from '../constants/type'
import Axios from 'axios'

export const addOrderAction = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.PLACEORDER_REQUEST })

        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await Axios.post(`/orders`, order, config)
        console.log(data)


        dispatch({
            type: types.PLACEORDER_SUCCESS,
            payload: data
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: types.PLACEORDER_ERROR,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message
        })
    }

}

export const fetchOrderDetails = (id) => async (dispatch, getState) => {
    try {
        console.log('In Fetch Order Action')
        dispatch({ type: types.FETCHORDER_REQUEST })
        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await Axios.get(`/orders/${id}`, config)

        dispatch({
            type: types.FETCHORDER_SUCCESS,
            payload: data
        })

    } catch (err) {
        console.log('Error in fetch order details')
        console.log(err)
        dispatch({
            type: types.FETCHORDER_ERROR,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message
        })
    }
}

export const updatePaymentDetails = (id, paymentDetails) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.PAYMENT_REQUEST })

        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await Axios.put(`/orders/${id}/pay`, paymentDetails, config)

        dispatch({
            type: types.PAYMENT_SUCCESS,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: types.PAYMENT_ERROR,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message
        })
    }
}

export const updateOrderDeliver = (productId, product) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ADMIN_DELIVER_REQUEST })

        const token = getState().userLogin ? getState().userLogin.userInfo.token : ''

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await Axios.put(`/orders/${productId}/deliver`, {}, config)

        dispatch({
            type: types.ADMIN_DELIVER_SUCCESS,
            payload: data
        })

    } catch (err) {
        console.log(err)
    }
}