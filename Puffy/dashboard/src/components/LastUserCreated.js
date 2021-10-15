import React from 'react';
import { useState, useEffect } from 'react';

// import ContentCategories from './ContentCategories';

function LastUserCreated() {


    const [lastUser, setLastUser] = useState(null);

    useEffect(() => {
        fetch('/api/users/last')
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setLastUser(res)
            })
            .catch(err => console.log(err))
    }, []);




    return (
        <React.Fragment>
            {
                lastUser != null &&
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">Último usuario registrado</h5>
                    </div>
                    <div className="card-body">
                        <h2 className="text-center pink-text">{lastUser.firstName} {lastUser.lastName}</h2>
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 40 + 'rem' }} src={lastUser.url} alt={lastUser.id} />
                        </div>
                        <h4>Creado hace {(Math.abs(new Date() - new Date(lastUser.createdAt))/(60*1000)).toFixed(0)} minutos.</h4>
                        <a className="btn btn-danger disabled" target="_blank" rel="nofollow" href="/">View detail</a>
                    </div>
                </div>
            }
        </React.Fragment>
    )

}
export default LastUserCreated;