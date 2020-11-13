import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import Cart from './Screens/Cart';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import UserListScreen from './Screens/UserListScreen';
import AdminUserEditScreen from './Screens/AdminUserEditScreen';
import ProductListScreen from './Screens/ProductListScreen';
import EditProductScreen from './Screens/EditProductScreen';
import OrdersScreen from './Screens/OrdersScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route path='/api/products/:id' component={ProductScreen} />
            {/* Question Mark is added so that id may be optional */}
            <Route path='/cart/:id?' component={Cart} />
            <Route path='/user/login' component={LoginScreen} />
            <Route path='/user/register' component={RegisterScreen} />
            <Route path='/user/profile' component={ProfileScreen} />
            <Route path='/user/shipping' component={ShippingScreen} />
            <Route path='/user/payment' component={PaymentScreen} />
            <Route path='/user/placeorder' component={PlaceOrderScreen} />
            <Route path='/orders/:id' component={OrderScreen} />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={AdminUserEditScreen} />
            <Route path='/admin/productlist' component={ProductListScreen} />
            <Route path='/admin/product/:id/edit' component={EditProductScreen} />
            <Route path='/admin/orders' component={OrdersScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
