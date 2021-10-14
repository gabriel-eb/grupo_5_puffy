import React from 'react';
import { useState, useEffect } from 'react';

// import ContentCategories from './ContentCategories';

function LastProductCreated() {


    const [lastProduct, setLastProduct] = useState();

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(res => {
                const arr = []
                res.products.map(prod => arr.push(prod.createdAt))

                const arrayFechas = arr.map((fechaActual) => new Date(fechaActual));
                const max = new Date(Math.max.apply(null, arrayFechas));

                const [arr2] = res.products.filter((prod2) => new Date(prod2.createdAt) - max === 0);
                fetch('/api/products/' + arr2.id)
                    .then(res => res.json())
                    .then(res => {
                        setLastProduct(res)
                    })

            })

    }, []);




    return (
        <React.Fragment>
            {
                lastProduct &&
                <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h5 className="m-0 font-weight-bold text-gray-800">Último producto agregado</h5>
                        </div>
                        <div className="card-body">
                            <h2 className="text-center pink-text">{lastProduct.name}</h2>
                            <div className="text-center">
                                <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 40 + 'rem' }} src={lastProduct.url} alt=" Star Wars - Mandalorian " />
                            </div>

                            <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View detail</a>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    )

}
export default LastProductCreated;