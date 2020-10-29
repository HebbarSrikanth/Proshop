import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'
import { cartReducers } from './reducers/cartReducers'
import { productListReducer, individualProductReducer } from './reducers/productReducers'
import { userLoginReducer } from './reducers/userReducer'

const cartItemsfromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: individualProductReducer,
    cart: cartReducers,
    userLogin: userLoginReducer
})

const initialState = {
    cart: {
        cartItems: cartItemsfromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [reduxThunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store



