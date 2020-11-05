import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchOrderDetails } from '../actions/orderAction'
import Spinner from '../Components/Loader'
import Message from '../Components/Message'

const OrderScreen = ({ match }) => {
    //Redux Related
    const dispatch = useDispatch()
    const orderState = useSelector(state => state.orderDetails)
    const { loading, error, order } = orderState

    useEffect(() => {
        console.log('Here in Order Screen')
        if (match.params.id) {
            dispatch(fetchOrderDetails(match.params.id))
        }
        //eslint-disable-next-line
    }, [match])

    return (
        loading ? <Spinner /> : error ? <Message variant='danger'>{error}</Message> : (
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
                    </ListGroup>
                </Col>
            </Row>
        )
    )
}

export default OrderScreen
