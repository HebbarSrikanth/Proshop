import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { individualProduct, insertReview } from '../actions/productActions'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, Form } from 'react-bootstrap'
import Rating from '../Components/Rating'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { types } from '../constants/type'


const ProductScreen = ({ match }) => {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetail = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetail

    const insertReviewState = useSelector(state => state.insertReview)
    const {
        loading: reviewLoading, success, error: reviewError
    } = insertReviewState

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productId = match.params.id

    useEffect(() => {
        if (success) {
            alert('Review Submitted')
            dispatch({ type: types.PRODUCT_REVIEW_RESET })
            setRating(0)
            setComment('')
        }
        dispatch(individualProduct(productId))
        //eslint-disable-next-line
    }, [dispatch, match, success])

    const reviewHandler = (e) => {
        e.preventDefault()
        dispatch(insertReview({ rating, comment }, productId))
    }

    return (
        <>
            <Link to='/' className='btn btn-light'>
                Go Back
            </Link>
            {loading ? <Loader /> : error ?
                <Message varainat='danger'>{error}</Message> : product &&
                <>
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
                                    <Rating rating={product.rating ? product.rating : 0} text={`${product.numReviews} Reviews`} color='yellow' />
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
                                            <Col>Quantity:</Col>
                                            <Col>
                                                <Form.Control as='select' value={qty} onChange={e => setQty(e.target.value)}>
                                                    {[...Array(product.countInStock)].map((val, id) => <option key={id}>{id + 1}</option>)}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Link to={`/cart/${product._id}?qty=${qty}`}>
                                                <Button className='btn-block'
                                                    disabled={product.countInStock <= 0}
                                                    type='button'
                                                >Add to Cart</Button>
                                            </Link>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h3>Reviews</h3>
                            {product.review && product.review.length === 0 &&
                                <Message variant='info'>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {
                                    product.review && product.review.map(r =>
                                        <ListGroup.Item key={r._id}>
                                            <strong>{r.name + ' '}</strong>
                                            <Rating rating={r.rating} color='yellow' />
                                            <p>{r.createdAt.substring(0, 10)}</p>
                                            <p>{r.comment}</p>
                                        </ListGroup.Item>
                                    )
                                }
                                <ListGroup.Item>
                                    <h3>Comment</h3>
                                    {userInfo ? (
                                        <>
                                            {reviewLoading && <Loader />}
                                            {reviewError && <Message variant='danger'>
                                                {reviewError}
                                            </Message>}
                                            <Form onSubmit={reviewHandler}>
                                                <Form.Group controlId='productRating'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control as='select' value={rating}
                                                        onChange={(e) => setRating(e.target.value)}>
                                                        {[...Array(5)].map((val, id) =>
                                                            <option key={id}>
                                                                {id + 1}
                                                            </option>
                                                        )}
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId='insertComment'>
                                                    <Form.Control as='textarea' value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                        rows={3} />
                                                </Form.Group>
                                                <Button type='submit'>Comment</Button>
                                            </Form>
                                        </>
                                    ) :
                                        <Message variant='info'>
                                            Please <Link to='/login'>Signin</Link> to review
                                        </Message>
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            }

        </>
    )
}

export default ProductScreen
