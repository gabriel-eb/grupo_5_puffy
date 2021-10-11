import { useState, useEffect } from 'react';
import React from 'react';

function ListProducts() {

    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(res => {
                setProducts(res.products)
            })

    }, []);



    const ejemplo = () => {
        return products.map(prod => {
            return (
                <>
                    <tr>
                        <td>{prod.id}</td>
                        <td>{prod.name}</td>
                        <td>{prod.description}</td>
                        <td>{prod.categories}</td>
                    </tr>
                </>
            )
        })
    };

    return (

        <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6
                            className="m-0 font-weight-bold text-gray-800"

                        >
                            Lista de Productos
                        </h6>
                    </div>
        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Categoría</th>
                </tr>
            </thead>
            <tbody>
                {
                    ejemplo()
                }
            </tbody>


        </table>

        </div>





    );


}

export default ListProducts;