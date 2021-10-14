import React from 'react';
import { Link } from 'react-router-dom';

function Navegation() {
    return (
        <div>
            <a href="/" style={{ marginRight: '10px' }}>Home</a>
            <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
            <Link to="/dashboard/123" style={{ marginRight: '10px' }}>Check</Link>
            <Link 
                to="/dashboard/product/create" 
                style={{ marginRight: '10px' }}
            >Crear</Link>
            <Link
                to="/dashboard/product/1/update"
                style={{ marginRight: '10px' }}
            >Modificar</Link>

            


        </div>
    )
}

export default Navegation;