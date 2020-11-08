import React, { useEffect, useState } from 'react'
import FormContainer from '../Components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { fetchUserProfile, updateUserProfile } from '../actions/adminActions'
import { types } from '../constants/type'

const AdminUserEditScreen = ({ match, history }) => {

    //Redux Related
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { user, loading: loadingDetails, error: errorDetails } = userDetails
    const userUpdate = useSelector(state => state.userUpdate)
    const { success, loading: loadingUpdate, error: errorUpdate } = userUpdate

    //Fetch the userid from the URL
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setAdmin] = useState(false)

    useEffect(() => {
        if (success) {
            dispatch({ type: types.ADMIN_EDITUSERPROFILE_RESET })
            history.push('/admin/userlist')
        } else {
            if (!user || user._id !== userId) {
                dispatch(fetchUserProfile(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setAdmin(user.isAdmin)
            }
        }
        //eslint-disable-next-line
    }, [userId, dispatch, user, success])

    const editHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserProfile(userId, { name, email, isAdmin }))
    }
    return (
        <FormContainer>
            <h4>Edit User Details</h4>
            <br />
            {(errorDetails || errorUpdate) && <Message variant='danger'>{errorDetails ? errorDetails : errorUpdate}</Message>}
            {(loadingDetails || loadingUpdate) ? <Loader /> :
                <Form onSubmit={editHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" value={name}
                            onChange={(e) => setName(e.target.value)} placeholder="Username" />
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </Form.Group>
                    <Form.Group controlId="isadmin">
                        <Form.Check type="checkbox" label="Admin" checked={isAdmin}
                            onChange={(e) => setAdmin(e.target.checked)}></Form.Check>
                    </Form.Group>
                    <Button type='submit' variant='danger'>Update</Button>
                </Form>
            }
        </FormContainer>
    )
}

export default AdminUserEditScreen
