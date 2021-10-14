import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';

function ProductDetail(props){
    const { id } = props.match.params
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [size, setSize] = useState();
    const [quantity, setQuantity] = useState();
    const [category, setCategory] = useState();
    const [createdAt, setCreatedAt] = useState();
    const [updatedAt, setUpdatedAt] = useState();
    const [url, setUrl] = useState();
    const [nameCat, setNameCat] = useState();

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(res => {
                setName(res.name)
                setDescription(res.description)
                setPrice(parseFloat(res.price).toFixed(2))
                setSize(res.size)
                setQuantity(res.quantity)
                setCategory(res.category)
                setCreatedAt(new Date(res.createdAt).getDate())
                setUpdatedAt(new Date(res.updatedAt).getDate())
                setUrl(res.url)
            })
            .catch(err => console.log(err));
    }, [id]);

    useEffect(() => {
        fetch(`/api/categories`)
            .then(res => res.json())
            .then(res => setNameCat(res.filter(cat => category === res.id)[0].name))
            .catch(err => console.log(err));
    }, [category]);

    const getSizeName = (num) => {
        switch(num){
            case 0:
                return 'Pequeño';
            case 1:
                return 'Mediano';
            default:
                return 'Grande'
        }
    }

    return(
        <div>
        {
                <div>
                {/* <p>{id}</p><br /> */}
                <p>{name}</p><br />
                <p>{description}</p><br />
                    <p>${parseFloat(price).toFixed(2)}</p><br />
                <p>{quantity}</p><br />
                <p>{getSizeName(size)}</p><br />
                <p>{size}</p><br />
                <p>{nameCat}</p><br />
                <p>{createdAt}</p><br />
                <p>{updatedAt}</p><br />
                <p>{url}</p><br />
            </div>

        }
        </div>
    )
}

export default withRouter(ProductDetail);