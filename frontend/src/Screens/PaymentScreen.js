import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import CheckoutSteps from '../Components/CheckoutSteps'
import FormContainer from '../Components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import { useDispatch } from 'react-redux'

const PaymentScreen = ({ history }) => {

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Completed Payment Option')
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/user/placeorder')
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 />
            <FormContainer>
                <h2>Payment Option</h2>
                <Form onSubmit={submitHandler}>
                    <Col>
                        <Form.Check type='radio'
                            label='Paypal'
                            name='payment'
                            id='paypal'
                            value='paypal'
                            defaultChecked
                            onChange={e => setPaymentMethod(e.target.value)}
                        />
                        <Form.Check
                            type='radio'
                            label='PhonePe'
                            name='payment'
                            value='phonepe'
                            id='phonepe'
                            onChange={e => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                    <hr />
                    <Button type='submit' variant='danger'>Continue</Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default PaymentScreen
