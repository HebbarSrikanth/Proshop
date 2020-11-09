export const types = {
    //Fetch all products 
    PRODUCT_LIST_REQUEST: 'PRODUCT_LIST_REQUEST',
    PRODUCT_FETCH_SUCCESS: 'PRODUCT_FETCH_SUCCESS',
    PRODUCT_FETCH_ERROR: 'PRODUCT_FETCH_ERROR',

    //Individual Product Types
    PRODUCT_DETAIL_REQUEST: 'PRODUCT_DETAIL_REQUEST',
    PRODUCT_DETAIL_FETCH_SUCCESS: 'PRODUCT_DETAIL_FETCH_SUCCESS',
    PRODUCT_DETAIL_FETCH_ERROR: 'PRODUCT_DETAIL_FETCH_ERROR',

    //Cart Types
    CART_ADD: 'CART_ADD',
    CART_REMOVE: 'CART_REMOVE',

    //Login Types
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESSFUL: 'LOGIN_SUCCESSFUL',
    LOGIN_FAIL: 'LOGIN_FAIL',
    LOGOUT: 'LOG_OUT',

    //REGISTER Types
    REGISTER_REQUEST: 'REGISTER_REQUEST',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAIL: 'REGISTER_FAIL',

    //FETCH PROFILE 
    PROFILE_REQUEST: 'PROFILE_REQUEST',
    PROFILE_SUCCESSFUL: 'PROFILE_SUCCESSFUL',
    PROFILE_ERROR: 'PROFILE_ERROR',
    PROFILE_RESET: 'PROFILE_RESET',

    //Update Profile Deatils
    UPDATE_PROFILE_REQUEST: 'UPDATE_PROFILE_REQUEST',
    UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
    UPDATE_PROFILE_ERROR: 'UPDATE_PROFILE_ERROR',

    //Shipping Details
    SAVE_SHIPPING_ADDRESS: 'SAVE_SHIPPING_ADDRESS',
    SAVE_PAYMENT_METHOD: 'SAVE_PAYMENT_METHOD',

    //Order Placement details
    PLACEORDER_REQUEST: 'PLACEORDER_REQUEST',
    PLACEORDER_SUCCESS: 'PLACEORDER_SUCCESS',
    PLACEORDER_ERROR: 'PLACEORDER_ERROR',

    //Fetch Order Details
    FETCHORDER_REQUEST: 'FETCHORDER_REQUEST',
    FETCHORDER_SUCCESS: 'FETCHORDER_SUCCESS',
    FETCHORDER_ERROR: 'FETCHORDER_ERROR',

    //Payment Details
    PAYMENT_REQUEST: 'PAYMENT_REQUEST',
    PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
    PAYMENT_ERROR: 'PAYMENT_ERROR',
    PAYMENT_RESET: 'PAYMENT_RESET',

    //UserAll Order Details
    USERORDER_REQUEST: 'USERORDER_REQUEST',
    USERORDER_SUCCESS: 'USERORDER_SUCCESS',
    USERORDER_ERROR: 'USERORDER_ERROR',
    USERORDER_RESET: 'USERORDER_RESET',

    //FETCH ALL USER FOR Admins
    ADMIN_FETCHUSER_REQUEST: 'ADMIN_FETCHUSER_REQUEST',
    ADMIN_FETCHUSER_SUCCESS: 'ADMIN_FETCHUSER_SUCCESS',
    ADMIN_FETCHUSER_ERROR: 'ADMIN_FETCHUSER_ERROR',
    ADMIN_USER_RESET: 'ADMIN_USER_RESET',

    //DELETE USER
    ADMIN_DELETEUSER_REQUEST: 'ADMIN_DELETEUSER_REQUEST',
    ADMIN_DELETEUSER_SUCCESS: 'ADMIN_DELETEUSER_SUCCESS',
    ADMIN_DELETEUSER_ERROR: 'ADMIN_DELETEUSER_ERROR',

    //Fetch user detils for the admin
    ADMIN_USERPROFILE_REQUEST: 'ADMIN_USERPROFILE_REQUEST',
    ADMIN_USERPROFILE_SUCCESS: 'ADMIN_USERPROFILE_SUCCESS',
    ADMIN_USERPROFILE_ERROR: 'ADMIN_USERPROFILE_ERROR',

    //Edit user details by admin
    ADMIN_EDITUSERPROFILE_REQUEST: 'ADMIN_EDITUSERPROFILE_REQUEST',
    ADMIN_EDITUSERPROFILE_SUCCESS: 'ADMIN_EDITUSERPROFILE_SUCCESS',
    ADMIN_EDITUSERPROFILE_ERROR: 'ADMIN_EDITUSERPROFILE_ERROR',
    ADMIN_EDITUSERPROFILE_RESET: 'ADMIN_EDITUSERPROFILE_RESET',


    //ADMIN Product delete 
    ADMIN_PRODUCTDELETE_REQUEST: 'ADMIN_PRODUCTDELETE_REQUEST',
    ADMIN_PRODUCTDELETE_SUCCESS: 'ADMIN_PRODUCTDELETE_SUCCESS',
    ADMIN_PRODUCTDELETE_ERROR: 'ADMIN_PRODUCTDELETE_ERROR'


}