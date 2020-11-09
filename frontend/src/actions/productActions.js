import Axios from 'axios'
import { types } from '../constants/type'

export const listProducts = () => async (dispatch) => {

    try {
        dispatch({ type: types.PRODUCT_LIST_REQUEST })

        const { data } = await Axios.get('/api/products')

        dispatch({ type: types.PRODUCT_FETCH_SUCCESS, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({
            type: types.PRODUCT_FETCH_ERROR,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message
        })
    }
}

export const individualProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.PRODUCT_DETAIL_REQUEST })

        const { data } = await Axios.get(`/api/products/${id}`)

        dispatch({ type: types.PRODUCT_DETAIL_FETCH_SUCCESS, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({
            type: types.PRODUCT_DETAIL_FETCH_ERROR,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ADMIN_PRODUCTDELETE_REQUEST })

        const token = getState().userLogin ? getState().userLogin.userInfo.token : ''

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await Axios.delete(`/api/products/${id}`, config)

        dispatch({
            type: types.ADMIN_PRODUCTDELETE_SUCCESS,
            payload: data
        })
    } catch (err) {
        console.log('Error while deleting the product by admin')
        dispatch({
            type: types.ADMIN_PRODUCTDELETE_ERROR,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message
        })
    }
}