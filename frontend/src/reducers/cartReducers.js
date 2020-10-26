import { types } from '../constants/type'

export const cartReducers = (state = { cartItems: [] }, action) => {

    switch (action.type) {
        case types.CART_ADD:
            //Check whether the item is already present using the find
            const item = action.payload
            const itemExist = state.cartItems.find(x => x.product === item.product)
            //If present then remove all the exisitng cart values of the product and insert the present qty
            if (itemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === item.product ? item : x)
                }
            }
            //If not present then add the present qty
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        default: return state
    }

}