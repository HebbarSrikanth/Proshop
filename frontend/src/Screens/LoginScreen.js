import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userAction'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { useEffect } from 'react'

const LoginScreen = ({ history, location }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()
    const user = useSelector(state => state.userLogin)
    const { userInfo, loading, error } = user

    //Check if the user is already logged in
    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    //When user enters the username and password
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h2 style={{ textAlign: 'center' }}>LOGIN</h2>
            {error ? <Message variant='danger'>{error}</Message> : null}
            {loading ? <Loader /> : null}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </Form.Group>
                <Button type='submit' variant='danger'>
                    Login
                </Button>
                <Form.Text>
                    Don't have an account?
                    <Link to={redirect ? `/user/register?redirect=${redirect}` : '/user/register'}>
                        Register
                    </Link>
                </Form.Text>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen
