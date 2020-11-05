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

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: types.CART_REMOVE,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (address) => async (dispatch) => {
    console.log('In Cart Action shipping')
    console.log(address)
    dispatch({
        type: types.SAVE_SHIPPING_ADDRESS,
        payload: address
    })
    localStorage.setItem('shippingAddress', JSON.stringify(address))
}

export const savePaymentMethod = (paymentMethod) => async (dispatch) => {
    dispatch({
        type: types.SAVE_PAYMENT_METHOD,
        payload: paymentMethod
    })
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
}