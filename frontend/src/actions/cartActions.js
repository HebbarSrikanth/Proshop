import Axios from 'axios'
import { types } from '../constants/type'

export const addToCart = (id, qty) => async (dispatch, getState) => {

    try {
        const { data } = await Axios.get(`/api/products/${id}`)

        if (data) {
            dispatch({
                type: types.CART_ADD,
                payload: {
                    product: data._id,
                    price: data.price,
                    image: data.image,
                    name: data.name,
                    countInStock: data.countInStock,
                    qty
                }
            })
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
        }
    } catch (err) {
        console.log(err)
    }
}