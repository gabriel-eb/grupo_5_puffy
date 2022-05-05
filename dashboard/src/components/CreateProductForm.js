import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';

function CreateProductForm() {
    const [prodName, setProdName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [choosedCat, setChoosedCat] = useState(0);
    const [size, setSize] = useState(0);
    const [price, setPrice] = useState(0.0);
    const [quantity, setQuantity] = useState(0);
    const [categories, setCategories] = useState([]);
    const [processing, setProcessing] = useState(false);
    const history = useHistory();


    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(res => setCategories(res))
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);

        const formData = new FormData();
        formData.append("name", prodName);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("category", choosedCat);
        formData.append("size", size);
        formData.append("price", price);
        formData.append("quantity", quantity);


        fetch('/api/products/create', {
            method: 'POST',
            body: formData
        })
            .then(() => {
                setProcessing(false);
                console.log("Creating new product");
                history.push('/dashboard');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="row justify-content-md-center" style={{margin:0}}>
            <div className="col-12 px-5 px-md-0 col-md-10">
                <h2 className="mt-3">Crear Producto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-8 col-12">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    name="prodName"
                                    id="prodName"
                                    value={prodName}
                                    onChange={e => setProdName(e.target.value)}
                                    required
                                />
                                <label>Nombre:</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea
                                    id="description"
                                    name="description"
                                    className="form-control"
                                    placeholder="Descripción"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    required
                                ></textarea>
                                <label>Descripción:</label>
                            </div>
                            <div className="mb-3">
                                <label className="float-start mb-1">Imagen del producto:</label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    className="form-control"
                                    onChange={e => setImage(e.target.files[0])}
                                    accept="image/png, image/jpeg, image/jpg"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-4 col-12">
                        <div className="row">
                            <div className="form-floating mb-3 col-md-6">
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    className="form-control"
                                    placeholder="Precio"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    required
                                />
                                <label>Precio:</label>
                            </div>
                            <div className="form-floating mb-3 col-md-6">
                                <input
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    className="form-control"
                                    placeholder="Cantidad"
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                    required
                                />
                                <label>Cantidad:</label>
                            </div>
                            </div>
                            <div className="form-floating mb-3">
                                <select
                                    name="category"
                                    id="category"
                                    className="form-select"
                                    placeholder="Categoria"
                                    value={choosedCat}
                                    onChange={e => setChoosedCat(e.target.value)}
                                    required
                                >
                                    <option value=""></option>
                                    { categories && categories.map(category => <option value={category.id}>{category.name}</option>)}
                                </select>
                                <label>Categoría:</label>
                            </div>
                            <div className="form-floating mb-3 mt-md-4">
                                <select
                                    name="size"
                                    id="size"
                                    className="form-select"
                                    placeholder="Tamaño"
                                    value={size}
                                    onChange={e => setSize(e.target.value)}
                                    required
                                >
                                    <option value=""></option>
                                    <option value="0">Chico</option>
                                    <option value="1">Mediano</option>
                                    <option value="2">Grande</option>
                                </select>
                                <label>Tamaño: </label>
                            </div>
                        </div>
                        <div>
                            {
                                !processing && 
                                <button className="btn btn-success mt-2 btn-lg col-12 col-md-2 offset-md-10"> 
                                Crear 
                                </button>
                            }
                            {
                                processing && 
                                <button className="btn btn-secondary mt-2 btn-lg col-12 col-md-2 offset-md-10" disabled>
                                 Creando... 
                                </button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(CreateProductForm);