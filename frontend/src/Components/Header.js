import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userAction'
import SearchBox from './SearchBox'
import { Route } from 'react-router-dom'

const Header = () => {

    const user = useSelector(state => state.userLogin)
    const { userInfo } = user
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    const userName = userInfo && (
        <NavDropdown title={userInfo.name} id='user-nav-dropdown'>
            <LinkContainer to='/user/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
        </NavDropdown>
    )

    const adminUser = userInfo && userInfo.isAdmin && (
        <NavDropdown title='Admin' id='adminmenu'>
            <LinkContainer to='/admin/userlist'>
                <NavDropdown.Item>Users</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/admin/productlist'>
                <NavDropdown.Item>Products</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/admin/orders'>
                <NavDropdown.Item>Orders</NavDropdown.Item>
            </LinkContainer>
        </NavDropdown>
    )

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <LinkContainer to='/'>
                    <Navbar.Brand>ProShop</Navbar.Brand>
                </LinkContainer>
                <Route render={({ history }) => <SearchBox history={history} />} />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <i className='fas fa-shopping-cart'></i>Cart
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo ? userName :
                            <LinkContainer to='/user/login'>
                                <Nav.Link>
                                    <i className='fas fa-user'></i>Sign In
                                 </Nav.Link>
                            </LinkContainer>
                        }
                        {userInfo && userInfo.isAdmin && adminUser}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header
