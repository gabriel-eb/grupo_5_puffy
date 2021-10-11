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
    },[]);

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
        <div>
            <form onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="prodName"
                    id="prodName"
                    value={prodName}
                    onChange={e => setProdName(e.target.value)}
                    required
                />
                <label>Descripción:</label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                ></textarea>
                <label>Imagen del producto:</label>
                <input 
                    type="file" 
                    name="image" 
                    id="image"
                    onChange={e => setImage(e.target.files[0]) }
                    accept="image/png, image/jpeg, image/jpg" 
                    required 
                />
                <label>Precio:</label>
                <input 
                    type="number" 
                    name="price" 
                    id="price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                />
                <label>Cantidad:</label>
                <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    required
                />
                <label>Categoría:</label>
                <select 
                    name="category" 
                    id="category"
                    value={choosedCat}
                    onChange={e => setChoosedCat(e.target.value)}
                    required
                >
                <option value=""></option>
                { categories.map(category => <option value={category.id}>{category.name}</option>) }
                </select>
                <label>Tamaño: </label>
                <select 
                    name="size" 
                    id="size"
                    value={size}
                    onChange={e => setSize(e.target.value)}
                    required
                >
                    <option value=""></option>
                    <option value="0">Chico</option>
                    <option value="1">Mediano</option>
                    <option value="2">Grande</option>
                </select>
                {!processing && <button> Crear </button>}
                {processing && <button disabled> Creando... </button>}
            </form>
        </div>
    )
}

export default withRouter(CreateProductForm);