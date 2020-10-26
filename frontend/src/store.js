import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'
import { cartReducers } from './reducers/cartReducers'
import { productListReducer, individualProductReducer } from './reducers/productReducers'

const cartItemsfromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: individualProductReducer,
    cart: cartReducers
})

const initialState = {
    cart: {
        cartItems: cartItemsfromStorage
    }
}

const middleware = [reduxThunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store



