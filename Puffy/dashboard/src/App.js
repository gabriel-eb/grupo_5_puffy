import React from 'react';
import './App.css';
import Navegation from './components/Navegation';
import { Switch, Route, Redirect } from 'react-router-dom'; 
import CreateProductForm from './components/CreateProductForm';
import UpdateProductFrom from './components/UpdateProductFrom';
import Dashboard from './components/Dashboard'
import ProductDetail from './components/ProductDetail'
import Users from './components/Users'

function App() {
    return (
      <div className="container-fluid" style={{padding:0}}>
        <Navegation />
        <Switch>
        <Route path="/dashboard" exact render={Dashboard} />
        <Route path="/dashboard/users" render={Users} />
        <Route path="/dashboard/products/create" render={CreateProductForm} />
        <Route path="/dashboard/products/:id/update" render={UpdateProductFrom} />
        <Route path="/dashboard/products/:id" render={ProductDetail} />
        <Redirect to="/dashboard" />
      </Switch>
      </div>
    );
}

export default App;
