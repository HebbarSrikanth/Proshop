import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'

const ShippingScreen = ({ history }) => {

    const [state, setState] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: ''
    })

    const changeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Clicked on Continue')
        history.push('/user/paymentmethod')
    }
    return (
        <FormContainer>
            <h2>Shipping Details</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='shippingAddress'>
                    <Form.Control type='text' value={state.address} onChange={changeHandler}
                        name='address' placeholder='Address' />
                </Form.Group>
                <Form.Group controlId='shippingCity'>
                    <Form.Control type='text' value={state.city} onChange={changeHandler}
                        name='city' placeholder='City' />
                </Form.Group>
                <Form.Group controlId='shippingPostalCode'>
                    <Form.Control type='text' value={state.postalCode} onChange={changeHandler}
                        name='postalCode' placeholder='Postal Code' />
                </Form.Group>
                <Form.Group controlId='shippingCountry'>
                    <Form.Control type='text' name='country' value={state.country}
                        onChange={changeHandler} placeholder='Country' />
                </Form.Group>
                <Button type='submit' variant='danger'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
