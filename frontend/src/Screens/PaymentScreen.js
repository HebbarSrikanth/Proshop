import React from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import CheckoutSteps from '../Components/CheckoutSteps'
import FormContainer from '../Components/FormContainer'

const PaymentScreen = () => {


    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Completed Payment Option')
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 />
            <FormContainer>
                <h2>Payment Option</h2>
                <Form onSubmit={submitHandler}>
                    <Col>
                        <Form.Check type='radio' defaultChecked label='Paypal' name='payment' id='paypal' />
                        <Form.Check type='radio' label='PhonePe' name='payment' id='phonepe' />
                    </Col>
                    <hr />
                    <Button type='submit' variant='danger'>Continue</Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default PaymentScreen
