import { useState, useEffect } from 'react';
import React from 'react';
import "../App.css"

function Cat() {

    const [countByCategory, setCountByCategory] = useState({});


    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(res => {
                setCountByCategory(res.countByCategory)
            })

    }, []);


    return (
        <React.Fragment>

            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6
                            className="m-0 font-weight-bold text-gray-800"

                        >
                            Total de productos por categoría
                        </h6>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {

                                <div className="col-lg-6 mb-4">
                                    <div className="card text-white shadow">
                                        <div className="card-body pink">
                                            Keto: {countByCategory.Keto}
                                        </div>
                                    </div>
                                </div>

                            }
                            {

                                <div className="col-lg-6 mb-4">
                                    <div className="card text-white bg-white  shadow">
                                        <div className="card-body pink">
                                            Normal: {countByCategory.Normal}
                                        </div>
                                    </div>
                                </div>

                            }
                            {

                                <div className="col-lg-6 mb-4">
                                    <div className="card text-white bg-white  shadow">
                                        <div className="card-body pink">
                                            Vegano: {countByCategory.Vegano}
                                        </div>
                                    </div>
                                </div>

                            }
                            {

                                <div className="col-lg-6 mb-4">
                                    <div className="card text-white bg-white  shadow">
                                        <div className="card-body pink">
                                            Light: {countByCategory.Light}
                                        </div>
                                    </div>
                                </div>

                            }
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}



export default Cat;