import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../Components/CheckoutSteps'
const ShippingScreen = ({ history }) => {

    //Redux Related
    const dispatch = useDispatch()
    const cartState = useSelector(state => state.cart)
    const { shippingAddress } = cartState

    const [state, setState] = useState({
        address: shippingAddress.address || '',
        city: shippingAddress.city || '',
        postalCode: shippingAddress.postalCode || '',
        country: shippingAddress.country || ''
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
        dispatch(saveShippingAddress({
            address: state.address,
            city: state.city,
            postalCode: state.postalCode,
            country: state.country
        }))
        history.push('/user/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
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
