import { useState, useEffect } from 'react';
import React from 'react';
import { MdAlternateEmail } from "react-icons/md";
import { BiUser, BiSearchAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';


function ListUsers() {

    const [users, setUsers] = useState([]);


    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(res => {
                setUsers(res.users)
            })

    }, []);



    const mapUsers = () => {
        return users.map(user => {
            return (
                <>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td><Link to={user.detail} disabled>Ver</Link></td>
                    </tr>
                </>
            )
        })
    };

    return (

        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-gray-800">
                    Lista de Usuarios
                </h6>
            </div>
            <div className="table-responsive p-lg-2">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                    <thead>
                        <tr>
                            <th className="pink-text">ID</th>
                            <th className="pink-text">{< BiUser />} Nombre </th>
                            <th className="pink-text">{< MdAlternateEmail />} Email </th>
                            <th className="pink-text">{< BiSearchAlt />} Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mapUsers()
                        }
                    </tbody>
                </table>
            </div>
        </div>





    );


}

export default ListUsers;