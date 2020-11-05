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