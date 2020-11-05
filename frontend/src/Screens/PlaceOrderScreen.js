import React from 'react'
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap'
import CheckoutSteps from '../Components/CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../Components/Message'
import { Link } from 'react-router-dom'
import { addOrderAction } from '../actions/orderAction'
import { useEffect } from 'react'

const PlaceOrderScreen = ({ history }) => {
    //Redux Related
    let cartState = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const orderState = useSelector(state => state.orderCreate)
    const { error, success, order } = orderState

    const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

    const itemTotalPrice = addDecimals(cartState.cartItems.reduce((acc, item) => acc + Number(item.price * item.qty), 0))
    const shippingPrice = addDecimals(itemTotalPrice > 100 ? 0 : 100)
    const taxPrice = addDecimals(Number(0.15 * itemTotalPrice).toFixed(2))
    const totalPrice = addDecimals(Number(itemTotalPrice) + Number(taxPrice) + Number(shippingPrice))

    cartState = {
        ...cartState,
        orderItems: cartState.cartItems,
        taxPrice,
        totalPrice,
        shippingPrice
    }

    useEffect(() => {
        if (success) {
            history.push(`/orders/${order._id}`)
        }
        //eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        console.log('Place an order')
        dispatch(addOrderAction(cartState))
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>Shipping</h4>
                            <p>
                                <strong>Address: </strong>
                                {cartState.shippingAddress.address},{' '}
                                {cartState.shippingAddress.city},{' '}
                                {cartState.shippingAddress.postalCode},{' '}
                                {cartState.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Payment Method</h4>
                            <p>
                                <strong>Method: </strong>
                                {cartState.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Order Items</h4>
                            {cartState.cartItems.length === 0 ?
                                <Message variant='info'>Your cart is empty</Message> :
                                <ListGroup variant='flush'>
                                    {cartState.cartItems.map((item, id) => (
                                        <ListGroup.Item key={id}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name}
                                                        fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`api/products/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${Number(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>Order Summary</h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>$ {itemTotalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping Amount</Col>
                                <Col>$ {shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax Amount</Col>
                                <Col>$ {taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total Amount</Col>
                                <Col>$ {totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Button type='button' disabled={cartState.cartItems.length === 0}
                                    block variant='info' onClick={placeOrderHandler}>
                                    Place Order
                                </Button>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
