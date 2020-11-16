import React, { useEffect } from 'react'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Col, Row, Table } from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { types } from '../constants/type'
import Paginate from '../Components/Paginate'

const ProductListScreen = ({ history, match }) => {
    //Redux Related
    const productList = useSelector(state => state.productList)
    const { products, loading, error, page, pages } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const { loading: deleteLoading, error: deleteError, success } = productDelete

    const createProductState = useSelector(state => state.createProduct)
    const {
        loading: createLoading, error: createError, success: createSuccess, productDetail
    } = createProductState

    const dispatch = useDispatch()

    const pageNumber = match.params.pageNumber || 1

    useEffect(() => {
        dispatch({ type: types.PRODUCT_CREATE_RESET })

        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts('', pageNumber))
        } else {
            history.push('/')
        }

        if (createSuccess) {
            history.push(`/admin/product/${productDetail._id}/edit`)
        }
        //eslint-disable-next-line
    }, [dispatch, userInfo, history, success, createSuccess, pageNumber])

    const editHandler = (id) => {
        if (window.confirm('Do you want to delete the product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const productCreate = () => {
        dispatch(createProduct())
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col><h4>Products</h4></Col>
                <Col className='text-right'>
                    <Button className='my-3' type='button' onClick={productCreate}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {
                (loading || deleteLoading || createLoading) ? <Loader /> : (error || deleteError || createError) ?
                    <Message variant='danger'>
                        {error ? error : deleteError ? deleteError : createError}
                    </Message> :
                    <>
                        <Table bordered hover striped>
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
                        <Paginate page={page} pages={pages} isAdmin={true} keyword='' />
                    </>
            }
        </>
    )
}

export default ProductListScreen
