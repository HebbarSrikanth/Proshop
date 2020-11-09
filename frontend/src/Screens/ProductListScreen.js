import React, { useEffect } from 'react'
import { listProducts } from '../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Table } from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { LinkContainer } from 'react-router-bootstrap'

const ProductListScreen = ({ history }) => {
    //Redux Related
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo.isAdmin) {
            dispatch(listProducts())
        } else {
            history.push('/')
        }
        //eslint-disable-next-line
    }, [dispatch, userInfo, history])

    const editHandler = (id) => {
        console.log('Clicked on edit on the product with id :' + id)
    }

    return (
        <>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
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
                                <td>{item.price}</td>
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
