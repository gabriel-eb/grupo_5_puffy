import React from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import App from './App';
import Page from './Page';

function PruebaRouter() {
    return (
        <div>
            <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
            <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
            <Link to="/dashboard/123" style={{ marginRight: '10px' }}>Check</Link>
            <a href="/">HOME</a>

            <Switch>
                <Route exact path="/dashboard" render={App} />
                <Route exact path="/dashboard/:id" render={Page} />
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default PruebaRouter;