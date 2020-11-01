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
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
