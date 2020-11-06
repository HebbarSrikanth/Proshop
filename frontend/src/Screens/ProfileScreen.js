import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProfileDetails, updateUserProfile, fetchUserOrders } from '../actions/userAction'

const ProfileScreen = ({ history }) => {

    //Redux Related
    const dispatch = useDispatch()
    const userLoginDetails = useSelector(state => state.userLogin)
    const { userInfo } = userLoginDetails
    const profileDetails = useSelector(state => state.userProfile)
    const { user, loading, error } = profileDetails
    const updateProfile = useSelector(state => state.profileUpdate)
    const { success } = updateProfile
    const orderList = useSelector(state => state.orderList)
    const { loading: loadingOrder, error: errorOrder, orders } = orderList

    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPass: ''
    })

    useEffect(() => {
        if (!userInfo) {
            history.push('/user/login')
        } else {
            if (!user.name) {
                dispatch(fetchProfileDetails('profile'))
                dispatch(fetchUserOrders())
            } else {
                setState({
                    ...state,
                    name: user.name,
                    email: user.email
                })
            }
        }
        //eslint-disable-next-line
    }, [userInfo, dispatch, history, user])

    const [message, setMessage] = useState(null)

    const changeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const updateHandler = (e) => {
        e.preventDefault()
        if (state.password !== state.confirmPass) {
            setMessage(`Password Doesn't match`)
        } else {
            dispatch(updateUserProfile({
                name: state.name,
                email: state.email,
                phone: state.phone,
                password: state.password
            }))
        }
    }

    return (
        <>
            <Row>
                <Col lg={3} md={6} xs={6}>
                    <h3>Update Profile</h3>
                    {message && <Message variant='danger'>{message}</Message>}
                    {success && <Message variant='info'>Profile Updated</Message>}
                    {error ? <Message variant='danger'>{error}</Message> : null}
                    {loading ? <Loader /> : null}
                    <Form className='py-2' onSubmit={updateHandler}>
                        <Form.Group controlId='profileName'>
                            <Form.Control name='name' value={state.name}
                                type='text' onChange={changeHandler} placeholder='Username' />
                        </Form.Group>
                        <Form.Group controlId='profileEmail'>
                            <Form.Control name='email' value={state.email}
                                type='email' onChange={changeHandler} placeholder='Email' />
                        </Form.Group>
                        <Form.Group controlId='profilePhone'>
                            <Form.Control name='phone' value={state.phone}
                                type='text' onChange={changeHandler} placeholder='Ph.No' />
                        </Form.Group>
                        <Form.Group controlId='profilePassword'>
                            <Form.Control name='password' value={state.password}
                                type='password' onChange={changeHandler} placeholder='Password' />
                        </Form.Group>
                        <Form.Group controlId='profileConfirmPass'>
                            <Form.Control name='confirmPass' type='password' value={state.confirmPass}
                                onChange={changeHandler} placeholder='Confirm Password' />
                        </Form.Group>
                        <Button type='submit' variant='danger'>
                            Update Profile
                        </Button>
                    </Form>
                </Col>
                <Col>
                    {loadingOrder ? <Loader /> : errorOrder ?
                        <Message variant='danger'> errorOrder</Message> :
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delievered</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(item => (
                                    <tr key={item._id}>
                                        <td>{item._id}</td>
                                        <td>{item.createdAt.substring(0, 10)}</td>
                                        <td>{item.totalPrice}</td>
                                        <td>{item.isPaid ? item.paidAt.substring(0, 10) :
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        }</td>
                                        <td>{item.isDelievered ? 'Delievered' :
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        }</td>
                                        <td>
                                            <LinkContainer to={`/orders/${item._id}`}>
                                                <Button className='btn-sm' variant='info'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    }
                </Col>
            </Row>
        </>
    )
}

export default ProfileScreen
