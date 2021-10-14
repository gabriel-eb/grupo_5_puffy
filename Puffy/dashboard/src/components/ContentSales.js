import { useState, useEffect } from 'react';
import React from 'react';
import "../App.css"

function ContentSales() {

    const [totalSales, setTotalSales] = useState(0);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products/sales')
            .then(res => res.json())
            .then(res => {
                setTotalSales(res.totalSales)
                setTopProducts(res.topProducts)
            })
            .catch(err => console.log(err))
    }, []);


    return (
        <React.Fragment>

            <div className="col-12 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-gray-800">
                            Información de Ventas
                        </h6>
                    </div>
                    {
                        topProducts.length === 0 &&
                        <h2>Cargando...</h2>
                    }
                    {
                        topProducts.length !== 0 &&
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 mb-4">
                                    <div className="card text-white shadow">
                                        <div className="card-body bg-success">
                                            <h4>Total de ventas:<br />{totalSales}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mb-4">
                                    <div className="card text-white bg-white  shadow">
                                        <div className="card-body bg-secondary">
                                            <h3>Productos más vendidos:</h3>
                                            <table className="table rounded bg-light" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Rank</th>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Vendido</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        topProducts.map((product, i) =>
                                                            <tr>
                                                                <th scope="row">{i + 1}</th>
                                                                <td>{product.id}</td>
                                                                <td>{product.name}</td>
                                                                <td>{product.count}</td>
                                                            </tr>
                                                        )
                                                    }

                                                </tbody>
                                            </table>
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



export default ContentSales;