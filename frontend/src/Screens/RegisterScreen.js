import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../Components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { register } from '../actions/userAction'

const RegisterScreen = ({ history }) => {
    let redirect = '/'

    const dispatch = useDispatch()
    const user = useSelector(state => state.userRegister)
    const { userInfo, error, loading } = user
    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPass: ''
    })

    const onChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo, redirect, history])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('About to Register')
        dispatch(register({
            name: state.name, email: state.email, phone: state.phone, password: state.password
        }))
    }

    return (
        <FormContainer>
            <h2 style={{ textAlign: 'center' }}>Register</h2>
            {error ? <Message variant='danger'>{error}</Message> : null}
            {loading ? <Loader /> : null}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='registerFormName'>
                    <Form.Control name='name' type='text' placeholder='Username' value={state.name} onChange={onChangeHandler} />
                </Form.Group>
                <Form.Group controlId='registerFormEmail'>
                    <Form.Control name='email' value={state.email} onChange={onChangeHandler} type='email' placeholder='Email' />
                </Form.Group>
                <Form.Group controlId='registerFormPhone'>
                    <Form.Control type='text' name='phone' value={state.phone} onChange={onChangeHandler} placeholder='Ph.No' />
                </Form.Group>
                <Form.Group controlId='registerFormPass'>
                    <Form.Control type='password' name='password' value={state.password} onChange={onChangeHandler} placeholder='Password' />
                </Form.Group>
                <Form.Group controlId='registerFormConfirmPass'>
                    <Form.Control type='password' name='confirmPass' value={state.confirmPass} onChange={onChangeHandler} placeholder='Re-enter Password' />
                </Form.Group>
                <Button type='submit' variant='danger' >Register</Button>
                <Form.Text>
                    Already a User?&nbsp;<Link to={'/user/login'}> SignIn</Link>
                </Form.Text>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen
