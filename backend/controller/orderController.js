import Order from '../model/orderModel.js'
import asyncHandler from 'express-async-handler'

// @DESC Create a new Order request
// @route POST /orders
// @access Protected
const addOrder = asyncHandler(async (req, res) => {
    const {
        orderItems, shippingAddress, paymentMethod, shippingPrice,
        taxPrice, totalPrice
    } = req.body

    if (orderItems && orderItems.length == 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

// @DESC Fetch Orders
// @route Get /orders/:id
// @access Protected

const fetchOrderDetails = asyncHandler(async (req, res) => {
    console.log('Call for fetch order details')
    const orderId = req.params.id

    const orderDetails = await Order.findById(orderId).populate('user', 'name email')

    if (orderDetails) {
        res.json(orderDetails)
    } else {
        res.status(404)
        throw new Error('Order Detail Not Found')
    }
})

//@DESC Update the Payment
//@route PUT /orders/:id/pay
//@access protected
const updatePaymentToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order Details Not Found')
    }
})

//@DESC Update the Delievered
//@route PUT /orders/:id/deliever
//@access admin protected
const updateDeliver = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelievered = true
        order.delieveredAt = Date.now()

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order Detials not found!!')
    }
})


export { addOrder, fetchOrderDetails, updatePaymentToPaid, updateDeliver }