import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD:dashboard/src/components/Navegation.js
=======
import { FaChevronCircleLeft } from 'react-icons/fa';
>>>>>>> sprint8:Puffy/dashboard/src/components/Navegation.js

function Navegation() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-ligth mb-5" style={{ backgroundColor: "#003459"}}>
            <div class="container-fluid">
                <a href="/" className="navbar-brand me-5" style={{ marginRight: '10px' }}>
                    <FaChevronCircleLeft style={{ color: '#f25287', fontSize: "1.5rem" }} />  Regresar a Tienda
                </a>
                <div className="collapse navbar-collapse ms-5 text-center" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item me-lg-3">
                            <Link className="nav-link" aria-current="page" to="/dashboard">
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link me-lg-3" 
                                aria-current="page" 
                                to="/dashboard/product/create"
                            >
                                Crear Producto
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link me-lg-3 disabled">Pronto...</Link>
                        </li>
                    </ul>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>

        </nav>
    )
}

export default Navegation;