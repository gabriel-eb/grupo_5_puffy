import SmallCard from './SmallCard';
import { useState, useEffect } from 'react';
import React from 'react';

function Card() {

    const [totalProducts, setTotalProducts] = useState();
    const [totalUsers, setTotalUsers] = useState();
  
    useEffect(() => {
      fetch('/api/products')
        .then(res => res.json())
        .then(res => {
          setTotalProducts(res.count)
        })
  
    }
      , []);
  
    useEffect(() => {
      fetch('/api/users')
        .then(res => res.json())
        .then(res => {
          setTotalUsers(res.count)
  
        })
  
    }, []);
  
  

let tUsers = {
    color:   "primary",
    titulo: "Total de usuarios en la plataforma",
    valor: totalUsers,
    icono: "fas fa-film",
}

let tProducts ={
    color:   "success",
    titulo: "Total de productos",
    valor: totalProducts,
    icono: "fas fa-award",
}

let tCategories = {
    color:   "warning",
    titulo: "Total de Categorías de postres",
    valor: 4,
    icono: "fas fa-user",
}

let cardProps = [tUsers,tProducts,tCategories];



    return (
        <React.Fragment>
        {/*<!-- Content Row -->*/}

        <div className="row">
            {
                cardProps.map((producto,index)=>{
                    return <SmallCard  {...producto}  key= {index}/>
                })
            }      
        </div>
        </React.Fragment>
    )

}


export default Card;