import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchOrderDetails, updatePaymentDetails, updateOrderDeliver } from '../actions/orderAction'
import Spinner from '../Components/Loader'
import Message from '../Components/Message'
import { types } from '../constants/type'

const OrderScreen = ({ match, history }) => {
    //Redux Related
    const dispatch = useDispatch()
    const orderState = useSelector(state => state.orderDetails)
    const { loading, error, order } = orderState

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: deliverLoading, error: deliverError, success: deliverSuccess } = orderDeliver

    //Create a state variable when tell if the paypal sdk is ready or not
    const [sdkReady, setSdkReady] = useState(false)
    const orderId = match.params.id

    useEffect(() => {

        if (!userInfo) {
            history.push('/')
        }
        console.log('Here in Order Screen')

        //Fetch the Paypal Client ID
        const addPaypalClient = async () => {
            const { data: clientId } = await Axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay || deliverSuccess) {
            //If Order detail is not present in state 
            //Or if the user paid is successful , then dispatch 
            dispatch({ type: types.PAYMENT_RESET })
            dispatch({ type: types.ADMIN_DELIVER_RESET })
            dispatch(fetchOrderDetails(orderId))
        } else if (!order.isPaid) {
            //if the payment is not done ,and if paypal window is not present
            if (!window.paypal) {
                addPaypalClient()
            } else {
                setSdkReady(true)
            }
        }


        //eslint-disable-next-line
    }, [orderId, dispatch, order, successPay, deliverSuccess])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(updatePaymentDetails(orderId, paymentResult))
    }

    const deliverHandle = () => {
        dispatch(updateOrderDeliver(orderId))
    }

    return (
        (loading || deliverLoading) ? <Spinner /> : (error || deliverError) ?
            <Message variant='danger'>
                {error ? error : deliverError}
            </Message> : (
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h4>Shipping</h4>
                                <p>
                                    <strong>Name :</strong>{order.user.name}
                                </p>
                                <p>
                                    <strong>Email Id:</strong>
                                    <a style={{ color: 'black' }} href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                </p>
                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address},{' '}
                                    {order.shippingAddress.city},{' '}
                                    {order.shippingAddress.postalCode},{' '}
                                    {order.shippingAddress.country}
                                </p>
                                {!order.isDelievered ? <Message variant='danger'>Not Delievered</Message> :
                                    <Message variant='info'>Delievered</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h4>Payment Method</h4>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                                {!order.isPaid ? <Message variant='danger'>Not Paid</Message> :
                                    <Message variant='info'>Paid</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h4>Order Items</h4>
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, id) =>
                                        <ListGroup.Item key={id}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/api/products/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x {item.price} = ${Number(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item><h4>Order Summary</h4></ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>$ {order.orderItems.reduce((acc, item) => acc + Number(item.price * item.qty), 0)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping Amount</Col>
                                    <Col>$ {order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax Amount</Col>
                                    <Col>$ {order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Amount</Col>
                                    <Col>$ {order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {
                                !order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Spinner />}
                                        {!sdkReady ? <Spinner /> : (
                                            <PayPalButton amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            />
                                        )}
                                    </ListGroup.Item>
                                )}
                            {
                                !order.isDelievered && userInfo && userInfo.isAdmin && order.isPaid && (
                                    <ListGroup.Item>
                                        <Button onClick={deliverHandle} btn-block varinat='info'>
                                            Mark Delivered
                                    </Button>
                                    </ListGroup.Item>
                                )}
                        </ListGroup>
                    </Col>
                </Row>
            )
    )
}

export default OrderScreen
