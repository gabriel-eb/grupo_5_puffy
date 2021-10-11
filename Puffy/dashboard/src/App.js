import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { FaBeer } from 'react-icons/fa'
import ContentSmallCard from './components/ContentSmallCard';
import ContentCategories from './components/ContentCategories';
import ListProducts from './components/Products';

function App() {

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState();
  const [countByCategory, setCountByCategory] = useState({});
  const [totalUsers, setTotalUsers] = useState();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(res => {
        setProducts(res.products)
        setTotalProducts(res.count)
        setCountByCategory(res.countByCategory)
      })

  }, []);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(res => {
        setTotalUsers(res.count)

      })

  }, []);



  
    const arr = []
    products.map(prod => arr.push(prod.createdAt))

    const arrayFechas = arr.map((fechaActual) => new Date(fechaActual));

    var max = new Date(Math.max.apply(null, arrayFechas));

    console.log(max)




    const arr2= products.filter((prod2) => {

        if (prod2.createdAt === max) {
          return prod2;
        }
      });
    
console.log(arr2)
  




    return (
      <div className="container-fluid">
        <Navbar />
        <ContentSmallCard />
        <ContentCategories />
        <ListProducts />

      </div>

    );
  }


export default App;
