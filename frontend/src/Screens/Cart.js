import React, { useEffect } from 'react'
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import Message from '../Components/Message'


const Cart = ({ match, location, history }) => {
    const productId = match.params.id
    //Location Search may be to available everytime as user may just click on Cart button
    const qty = location.search ? location.search.split('=')[1] : 1

    const dispatch = useDispatch()

    //Fetch the items from cart using the useSelector
    const cart = useSelector(state => state.cart)
    console.log(cart)
    const { cartItems } = cart

    const removeFromCart = (id) => {
        console.log(id)
    }

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ?
                    <Message
                        message={'Your cart is empty ' + <Link to='/'>Go Back</Link>} />
                    : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`api/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}>{item.qty}</Col>
                                        <Col md={2}>
                                            <Button type='button' onClick={() => removeFromCart(item.product)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
            </Col>
        </Row>
    )
}

export default Cart
