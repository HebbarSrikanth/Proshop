import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrders } from '../actions/adminActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const OrdersScreen = ({ history }) => {

    //Redux Related
    const dispatch = useDispatch()
    const orderlistState = useSelector(state => state.ordersList)
    const { error, loading, orderList } = orderlistState
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        console.log('Here ')
        if (userInfo && userInfo.isAdmin) {
            dispatch(fetchOrders())
        } else {
            history.push('/')
        }
        //eslint-disable-next-line
    }, [dispatch, userInfo])

    const detailHandler = (id) => {
        console.log(id)
        history.push(`/orders/${id}`)
    }

    return (
        <>
            <h3>Orders</h3>
            {loading ? <Loader /> : error ?
                <Message variant='danger'>{error}</Message> :
                <Table striped hover bordered>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delievered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList.map(order =>
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? 'Paid' : 'Not Paid'}</td>
                                <td>{order.isDelievered ? `Delievered on ${order.delieveredAt.substring(0, 10)}` : 'Not Delievered'}</td>
                                <td>
                                    <Button variant='info' type='button' onClick={() => detailHandler(order._id)} >
                                        Details
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            }
        </>
    )
}

export default OrdersScreen
