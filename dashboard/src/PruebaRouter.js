import React from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';
import App from './App';
import Page from './Page';

function PruebaRouter() {
    return (
        <div>
            <NavLink to="/" style={{ marginRight: '10px' }}>Home</NavLink>
            <NavLink to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</NavLink>
            <NavLink to="/123" style={{ marginRight: '10px' }}>Check</NavLink>

            <Switch>
                <Route exact path="/dashboard" render={App} />
                <Route exact path="/:id" render={Page} />
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default PruebaRouter;