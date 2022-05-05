import SmallCard from './SmallCard';
import { useState, useEffect } from 'react';
import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { HiCake } from "react-icons/hi";
import { BiCategory } from "react-icons/bi";



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
    color: "primary",
    titulo: "Total de usuarios en la plataforma",
    valor: totalUsers,
    icono: <FaUsers style={{fontSize: "2rem"}} />,
  }

  let tProducts = {
    color: "success",
    titulo: "Total de productos",
    valor: totalProducts,
    icono: <HiCake style={{ fontSize: "2rem" }}  />,
  }

  let tCategories = {
    color: "warning",
    titulo: "Total de Categorías de postres",
    valor: 4,
    icono: <BiCategory style={{ fontSize: "2rem" }} />,
  }

  let cardProps = [tUsers, tProducts, tCategories];



  return (
    <React.Fragment>
      <div className="row">
        {
          cardProps.map((producto, index) => {
            return <SmallCard  {...producto} key={index} />
          })
        }
      </div>
    </React.Fragment>
  )

}


export default Card;