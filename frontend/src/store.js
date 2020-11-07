import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'
import { cartReducers } from './reducers/cartReducers'
import { productListReducer, individualProductReducer } from './reducers/productReducers'
import {
    userLoginReducer, userRegisterReducer,
    userProfileReducer, profileUpdateReducer, orderListReducer
} from './reducers/userReducer'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducers'
import { userListReducer, userDeleteReducer, userDetailsReducer, userUpdateReducer } from './reducers/adminReducers'

const cartItemsfromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: individualProductReducer,
    cart: cartReducers,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    profileUpdate: profileUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer
})

const initialState = {
    cart: {
        cartItems: cartItemsfromStorage,
        shippingAddress: shippingAddressFromLocalStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [reduxThunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store



