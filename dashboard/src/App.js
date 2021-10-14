import React from 'react';
import './App.css';
import Navegation from './components/Navegation';
import { Switch, Route, Redirect } from 'react-router-dom'; 
import Page from './components/Page';
import CreateProductForm from './components/CreateProductForm';
import UpdateProductFrom from './components/UpdateProductFrom';
import Dashboard from './components/Dashboard'

function App() {
    return (
      <div className="container-fluid">
        <Navegation />
        <Switch>
        <Route path="/dashboard" exact render={Dashboard} />
        <Route path="/dashboard/product/create" render={CreateProductForm} />
        <Route path="/dashboard/product/:id/update" render={UpdateProductFrom} />
        <Route path="/dashboard/:id" render={Page} />
        <Redirect to="/dashboard" />
      </Switch>
      </div>
    );
}

export default App;
