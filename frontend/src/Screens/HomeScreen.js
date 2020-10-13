import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product'

const HomeScreen = () => {

    const [products, setProduct] = useState([])

    const fetchProducts = async () => {
        const res = await axios.get('/products')
        setProduct(res.data)
    }

    useEffect(() => {
        fetchProducts()
        //eslint-disable-next-line
    }, [])

    return (
        <>
            <h2>Welcome to Proshop</h2>
            <Row>
                {products.map((product, id) => (
                    <Col key={id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
