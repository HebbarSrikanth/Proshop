import Axios from 'axios'

export const listProducts = () => async (dispatch) => {

    try {
        dispatch({ type: 'PRODUCT_LIST_REQUEST' })

        const { data } = await Axios.get('/api/products')

        dispatch({ type: 'PRODUCT_FETCH_SUCCESS', payload: data })

    } catch (err) {
        console.log(err)
        dispatch({
            type: 'PRODUCT_FETCH_ERROR',
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message
        })
    }
}

export const individualProduct = (id) => async (dispatch) => {
    try {
        console.log(`api/products/${id}`)
        dispatch({ type: 'PRODUCT_REQUEST' })

        const { data } = await Axios.get(`/api/products/${id}`)
        console.log(data)

        dispatch({ type: 'FETCH_SUCCESS', payload: data })

    } catch (err) {
        console.log(err)
        dispatch({
            type: 'FETCH_ERROR',
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message
        })
    }
}