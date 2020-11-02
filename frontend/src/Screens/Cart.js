import React, { useEffect } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../Components/Message'


const Cart = ({ match, location, history }) => {
    const productId = match.params.id

    //Location Search may be to available everytime as user may just click on Cart button
    const qty = location.search ? location.search.split('=')[1] : 1

    const dispatch = useDispatch()

    //Fetch the items from cart using the useSelector
    const cart = useSelector(state => state.cart)

    const { cartItems } = cart

    const removeCart = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        console.log("Clicked on proceed handler")
        history.push('/user/login?redirect=shipping')
    }

    useEffect(() => {

        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    return (
        <Row>
            <Col md={8}>
                <h2 style={{ textAlign: 'center' }}>Cart</h2>
                {cartItems.length === 0 ?
                    <Message>Your Cart is Empty <Link to='/'>Go Back</Link></Message>
                    : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/api/products/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col>
                                            <Form.Control as='select'
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                            >
                                                {
                                                    [...Array(item.countInStock)].map((val, id) =>
                                                        <option key={id}>{id + 1}</option>)
                                                }
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button type='button' onClick={() => removeCart(item)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>Subtotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) Items</h4>
                            <b>${cartItems.reduce((acc, item) => acc + Number(item.qty * item.price), 0).toFixed(2)}</b>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                disabled={cartItems.length === 0}
                                className='btn-block'
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default Cart
