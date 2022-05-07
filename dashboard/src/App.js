import React, {useState, useEffect} from 'react';
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
  const [isAdmin, setIsAdmin] = useState(true);
  useEffect(()=>{
    fetch(`/api/isAdmin`)
            .then(res => res.json())
            .then(res => {
                if('isAdmin' in res){
                  setIsAdmin(res.isAdmin);
                } else {
                  setIsAdmin(false);
                }
            })
            .catch(err => console.log(err));
  },[]);
  
    return (
      <>
      {
        !isAdmin && 
        <div>
          <h1>403 - No estás autorizado para usar esta sección</h1>
          <a href="/" className="navbar-brand me-5" style={{ marginRight: '10px' }}> Regresar a Tienda</a>
        </div>
      }
     {
      isAdmin && 
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
      }
      </>
    );
}

export default App;
