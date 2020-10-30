import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../Components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'

const RegisterScreen = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userLogin)
    const { userInfo, error, loading } = user

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('About to Register')
    }

    return (
        <FormContainer>
            <h2 style={{ textAlign: 'center' }}>Register</h2>
            {error ? <Message variant='danger'>{error}</Message> : null}
            {loading ? <Loader /> : null}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='registerFormName'>
                    {/* <Form.Label>Name</Form.Label> */}
                    <Form.Control type='text' placeholder='Username' />
                </Form.Group>
                <Form.Group controlId='registerFormEmail'>
                    {/* <Form.Label>Email</Form.Label> */}
                    <Form.Control type='email' placeholder='Email' />
                </Form.Group>
                <Form.Group controlId='registerFormPhone'>
                    {/* <Form.Label>Phone</Form.Label> */}
                    <Form.Control type='text' placeholder='Ph.No' />
                </Form.Group>
                <Form.Group controlId='registerFormPass'>
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control type='text' placeholder='Password' />
                </Form.Group>
                <Form.Group controlId='registerFormConfirmPass'>
                    {/* <Form.Label>Confirm Password</Form.Label> */}
                    <Form.Control type='text' placeholder='Re-enter Password' />
                </Form.Group>
                <Button type='submit' variant='danger' >Register</Button>
                <Form.Text>
                    Already a User?&nbsp;
                    <Link to={'/user/login'}>
                        SignIn
                    </Link>
                </Form.Text>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen
