import React from "react";
import { Link } from "react-router-dom";
import '../assets/css/404.css';

function Error404(){
    return(
        <div className="main">
            <object type="image/svg+xml" data="404.svg" className="image">404</object>
            <h2 className="title">Error 404</h2>
            <p className="message">Página no encontrada.</p>
            <Link to="/dashboard" className="return"> Regresar </Link>
        </div>
    )
}

export default Error404;