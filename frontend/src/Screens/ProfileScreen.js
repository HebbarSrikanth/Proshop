import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProfileDetails, updateUserProfile } from '../actions/userAction'

const ProfileScreen = ({ history }) => {

    //Redux Related
    const dispatch = useDispatch()
    const userLoginDetails = useSelector(state => state.userLogin)
    const { userInfo } = userLoginDetails
    const profileDetails = useSelector(state => state.userProfile)
    const { user, loading, error } = profileDetails
    const updateProfile = useSelector(state => state.profileUpdate)
    const { success } = updateProfile

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
                    <h3>My Orders</h3>
                </Col>
            </Row>
        </>
    )
}

export default ProfileScreen
