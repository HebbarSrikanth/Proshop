import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { individualProduct } from '../actions/productActions'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import Rating from '../Components/Rating'


const ProductScreen = ({ match }) => {

    const dispatch = useDispatch()

    const productDetail = useSelector(state => state.productDetails)
    const { product } = productDetail

    useEffect(() => {
        dispatch(individualProduct(match.params.id))
        //eslint-disable-next-line
    }, [dispatch, match])

    return (
        <>
            <Link to='/' className='btn btn-light'>
                Go Back
            </Link>
            {product &&
                <Row>
                    <Col md={6}>
                        <Image src={product.image} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>{product.name}</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating rating={product.rating} text={`${product.numReviews} Reviews`} color='yellow' />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h3>
                                    Price: <b>${product.price}</b>
                                </h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>${product.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Button className='btn-block'
                                            disabled={product.countInStock <= 0}
                                            type='button'
                                        >Add to Cart</Button>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            }

        </>
    )
}

export default ProductScreen
