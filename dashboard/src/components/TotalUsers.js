import React, { useEffect, useState } from "react";

function TotalUsers() {

    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(res => {
                setTotalUsers(res.count)
            })
            .catch(err => console.log(err))
    }, []);


    return (
        <React.Fragment>
            <div className="col-12 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-gray-800">
                            Totales de Usuarios
                        </h6>
                    </div>
                    {
                        totalUsers === 0 &&
                        <h2>Cargando...</h2>
                    }
                    {
                        totalUsers !== 0 &&
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 mb-4">
                                    <div className="card text-white shadow">
                                        <div className="card-body bg-success">
                                            <h4>Total de usuarios:<br />{totalUsers}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default TotalUsers;