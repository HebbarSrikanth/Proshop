import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserList, deleteUser } from '../actions/adminActions'
import Message from '../Components/Message'
import Spinner from '../Components/Loader'
import { LinkContainer } from 'react-router-bootstrap'

const UserListScreen = ({ history }) => {

    //Redux State
    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userDelete = useSelector(state => state.userDelete)
    const { success: deleteSuccess } = userDelete

    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(fetchUserList())
        } else {
            history.push('/')
        }
        //eslint-disable-next-line
    }, [dispatch, userInfo, history, deleteSuccess])

    const deleteHandler = (id) => {
        if (window.confirm('Do you want to delete the user?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <>
            <h3 style={{ textAlign: 'center' }}>Users</h3>
            {loading ? <Spinner /> : error ? <Message variant='danger'>{error}</Message> :
                <Table style={{ textAlign: 'center' }} striped bordered responsive hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email Id</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(item => (
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.isAdmin ? <i style={{ color: 'green' }} className='fas fa-check'></i> :
                                    <i style={{ color: 'red' }} className='fas fa-times'></i>
                                }</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${item._id}/edit`}>
                                        <Button variant='info' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    {'    '}
                                    <Button className='btn-sm' onClick={() => deleteHandler(item._id)}>
                                        <i className='fas fa-times'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </>
    )
}

export default UserListScreen
