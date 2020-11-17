import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { getTopProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Message'

const ProductCarousel = () => {

    const dispatch = useDispatch()
    const topProduct = useSelector(state => state.topProduct)
    const { products, loading, error } = topProduct

    useEffect(() => {
        dispatch(getTopProducts())
        //eslint-disable-next-line
    }, [dispatch])

    return (
        loading ? null : error ? <Message variant='danger'>{error}</Message> :
            <Carousel pause='hover' className='bg-dark'>
                {products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/api/products/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid />
                            <Carousel.Caption className='carousel-caption'>
                                <h3>{product.name} (${product.price})</h3>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
    )
}

export default ProductCarousel
