import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`api/products/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>

            <Card.Body>
                <Link to={`api/products/${product._id}`}>
                    <Card.Title as='div' style={{ color: 'black' }}>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <Rating text={`${product.numReviews} reviews`}
                        rating={product.rating} color='yellow' />
                </Card.Text>

                <Card.Text as='h3'>
                    <b>${product.price}</b>
                </Card.Text>

            </Card.Body>
        </Card >
    )
}

export default Product
