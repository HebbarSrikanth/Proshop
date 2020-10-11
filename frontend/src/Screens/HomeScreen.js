import React from 'react'
import products from '../products'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product'

const HomeScreen = () => {
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
