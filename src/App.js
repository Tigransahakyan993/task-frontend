import React from 'react';
import {history} from './halpers/history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  } from "react-router-dom";
import './style.css';
import Header from "./containers/headerContainer";
import HomeComponent from "./containers/homeContainer";
import LoginComponent from './containers/logInContainer';
import RegistrationComponent from './containers/registrationContainer';
import Footer from "./components/FooterComponent/FooterComponent";
import CartComponent from "./containers/cartContainer";
import RestaurantsComponent from "./containers/RestaurantsContainer";
import RestaurantComponent from "./containers/RestaurantContainer";
import ProductItemComponent from "./containers/productItemContainer";
import OrdersComponent from "./containers/OrdersContainer";
import OrderComponent from "./containers/OrderContainer";
import RegistrationConfirmPage from "./components/UiComponents/RegistrationComfirmPage";
import './setup';

function App() {
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route exact path='/' component={HomeComponent}/>
        <Route path='/login' component={LoginComponent}/>
        <Route path='/registration' component={RegistrationComponent}/>
        <Route path='/restaurants/:id' component={RestaurantComponent}/>
        <Route path='/restaurants' component={RestaurantsComponent}/>
        <Route path='/products/:id' component={ProductItemComponent}/>
        <Route path='/cart' component={CartComponent}/>
        <Route path='/orders/:id' component={OrderComponent}/>
        <Route path='/orders' component={OrdersComponent}/>
        <Route path='/registration-success' component={RegistrationConfirmPage}/>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;