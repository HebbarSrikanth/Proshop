import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const HomeScreen = ({ match }) => {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { products, error, loading } = productList

    const keyword = match.params.keyword

    useEffect(() => {
        //fetchProducts()
        dispatch(listProducts(keyword))
        //eslint-disable-next-line
    }, [dispatch, keyword])

    return (
        <>
            {loading ? <Loader /> :
                error ? <Message variant='danger'>{error}</Message> :
                    <div>
                        <h2>Welcome to Proshop</h2>
                        <Row>
                            {products.map((product, id) => (
                                <Col key={id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                    </div>
            }
        </>
    )
}

export default HomeScreen
