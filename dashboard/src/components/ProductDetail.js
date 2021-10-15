import React, { useEffect, useState } from "react";
import { Link, withRouter } from 'react-router-dom';

function ProductDetail(props) {
    const { id } = props.match.params
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const formatDate = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    useEffect(() => {
        fetch(`/api/categories`)
            .then(res => res.json())
            .then(res => {
                setCategories(res)
                console.log(res)
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(res => {
                setProduct(res)
                console.log(res)
            })
            .catch(err => console.log(err));
    }, [id]);


    const getSizeName = (num) => {
        switch (num) {
            case 0:
                return 'Pequeño';
            case 1:
                return 'Mediano';
            default:
                return 'Grande'
        }
    }

    return (
        <div className="row d-flex align-items-center px-1 px-md-5" style={{ margin: "0" }}>
            {
                categories.length > 0 && product &&
                <>
                    <div className="col-12 text-center mb-3"><h1>Detalle del producto</h1></div>
                    <div className="col-md-5 mb-5">
                        <img className="img-fluid" src={product.url} alt={product.name} />

                        <div className="row d-lg-flex d-none mt-2">
                            <div className="col-6">
                                <h4>Tamaño:</h4><h5>{getSizeName(product.size)}</h5>
                            </div>
                            <div className="col-6">
                                <h4>Cantidad:</h4><h5>{product.quantity}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 ps-md-5 mb-3">
                        <div className="row">
                            <div className="col-8">
                                <h3>Nombre:</h3><p>{product.name}</p>
                            </div>
                            <div className="col-4">
                                <Link to={`/dashboard/products/${product.id}/update`} className="btn btn-warning mb-3">Editar</Link>
                                <h3>ID: {product.id}</h3>
                            </div>
                        </div>
                        <h3>Descripción:</h3><p>{product.description}</p><br />
                        <div className="row d-lg-none mb-3">
                            <div className="col-6">
                                <h5>Tamaño:</h5><p>{product.size}</p>
                            </div>
                            <div className="col-6">
                                <h5>Cantidad:</h5><p>{product.quantity}</p>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <h3>Precio:</h3><p>$ {parseFloat(product.price).toFixed(2)} mxn</p>
                            </div>
                            <div className="col-6">
                                <h3>Categoría:</h3>
                                <p>
                                    {categories.filter(cat => cat.id === product.category)[0].name}
                                </p>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-lg-6">
                                <h3>Creado:</h3>
                                <p>
                                    {new Date(product.createdAt).toLocaleDateString("sp-MX", formatDate)}
                                </p>
                            </div>
                            <div className="col-lg-6">
                                <h3>Actualizado:</h3>
                                <p>
                                    {new Date(product.updatedAt).toLocaleDateString("sp-MX", formatDate)}
                                </p>
                            </div>
                        </div>

                    </div>
                </>
            }
            {
                categories.length === 0 && !product &&
                <div className="col-12 text-center mt-5">
                    <h1>Estamos horneando tu postre...</h1>
                </div>
            }
        </div>
    )
}

export default withRouter(ProductDetail);