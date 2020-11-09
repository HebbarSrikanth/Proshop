import React, { useEffect } from 'react'
import { listProducts, deleteProduct } from '../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Col, Row, Table } from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { LinkContainer } from 'react-router-bootstrap'

const ProductListScreen = ({ history }) => {
    //Redux Related
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const { loading: deleteLoading, error: deleteError, success } = productDelete

    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts())
        } else {
            history.push('/')
        }
        //eslint-disable-next-line
    }, [dispatch, userInfo, history, success])

    const editHandler = (id) => {
        console.log('Clicked on edit on the product with id :' + id)
        if (window.confirm('Do you want to delete the product?')) {
            dispatch(deleteProduct(id))
        }
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col><h4>Products</h4></Col>
                <Col className='text-right'>
                    <Button className='my-3'>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {(loading || deleteLoading) ? <Loader /> : (error || deleteError) ? <Message variant='danger'>{error ? error : deleteError}</Message> :
                <Table bordered hover striped cellSpacing>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>In Stock Count</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(item => (
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>$ {item.price}</td>
                                <td>{item.countInStock}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${item._id}/edit`}>
                                        <Button className='btn-sm' variant='info'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    {'  '}
                                    <Button className='btn-sm' type='button' onClick={() => editHandler(item._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </>
    )
}

export default ProductListScreen
