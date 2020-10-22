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