import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';

function CreateProductForm() {
    const [prodName, setProdName] = useState('');
    const [description, setDescription] = useState('');
    const [processing, setProcessing] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        const body = { prodName, description };
        fetch('/api/products/create', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
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
                <label for="prodName">Nombre:</label>
                <input
                    type="text"
                    name="prodName"
                    id="prodName"
                    value={prodName}
                    onChange={e => setProdName(e.target.value)}
                    required
                />
                <label for="description">Descripción:</label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                ></textarea>
                {!processing && <button> Crear </button>}
                {processing && <button disabled> Creando... </button>}
            </form>
        </div>
    )
}

export default withRouter(CreateProductForm);