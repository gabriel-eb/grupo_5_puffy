import React, { useEffect, useState } from "react";
import { Link, withRouter } from 'react-router-dom';

function UserDetail(props) {
    const { id } = props.match.params
    const [user, setUser] = useState(null)
    const formatDate = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    useEffect(() => {
        fetch(`/api/users/${id}`)
            .then(res => res.json())
            .then(res => setUser(res))
            .catch(err => console.log(err))
            console.log(user)
    }, [id])

    return (
        <div className="row d-flex align-items-center px-1 px-md-5" style={{ margin: "0" }}>
            {
                // Prints when user is fetched correctly
                user && !user.error &&
                <>
                    <div className="col-12 text-center mb-3"><h1>Detalle del usuario</h1></div>
                    <div className="col-md-5 mb-5">
                        <img className="img-fluid" src={user.url} alt={user.name} />
                    </div>
                    <div className="col-md-7 ps-md-5 mb-3">
                        <div className="row">
                            <div className="col-8">
                                <h3>Nombre:</h3><p>{user.firstName} {user.lastName}</p>
                            </div>
                            <div className="col-4">
                                <h3>ID: {user.id}</h3>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <h5>Móvil:</h5><p>{user.mobile}</p>
                            </div>
                            <div className="col-6">
                                <h5>E-mail:</h5><p>{user.email}</p>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-lg-6">
                                <h3>Creado:</h3>
                                <p>
                                    {new Date(user.createdAt).toLocaleDateString("sp-MX", formatDate)}
                                </p>
                            </div>
                            <div className="col-lg-6">
                                <h3>Última sesión:</h3>
                                <p>
                                    {new Date(user.lastLogin).toLocaleDateString("sp-MX", formatDate)}
                                </p>
                            </div>
                        </div>

                    </div>
                </>
            }
            {
                // Prints while fetching user
                !user &&
                <div className="col-12 text-center mt-5">
                    <h1>Estamos buscando al usuario...</h1>
                </div>
            }
            {
                // Prints if json returns error
                user && user.error &&
                <div className="col-12 text-center mt-5">
                    <h1>El usuario que buscas no existe.</h1>
                    <h4><Link to="/dashboard">Regresar a dashboard.</Link></h4>
                </div>
            }
        </div>
    )
}

export default withRouter(UserDetail);