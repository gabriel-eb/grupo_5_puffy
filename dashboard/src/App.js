import React from 'react';
import './App.css';
import Navegation from './components/Navegation';
import { Switch, Route, Redirect } from 'react-router-dom'; 
import CreateProductForm from './components/CreateProductForm';
import UpdateProductFrom from './components/UpdateProductFrom';
import Dashboard from './components/Dashboard'
import ProductDetail from './components/ProductDetail'
import Users from './components/Users'
import UserDetail from './components/UserDetail';
import Error404 from './components/Error404';

function App() {
    return (
      <div className="container-fluid" style={{padding:0}}>
        <Navegation />
        <Switch>
        <Route path="/404" exact render={Error404} />
        <Route path="/dashboard" exact render={Dashboard} />
        <Route path="/dashboard/users" exact render={Users} />
        <Route path="/dashboard/users/:id" render={UserDetail} />
        <Route path="/dashboard/products/create" render={CreateProductForm} />
        <Route path="/dashboard/products/:id/update" render={UpdateProductFrom} />
        <Route path="/dashboard/products/:id" render={ProductDetail} />
        <Redirect to="/404" />
      </Switch>
      </div>
    );
}

export default App;
