import { useState, useEffect } from 'react';
import './App.css';



function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(res => setProducts(res.products))
  }, []);

  const ejemplo = () => {
    return products.map(prod => {
      return (
        <>
          <p>{prod.name}</p>
          <p>{prod.description}</p>
        </>
      )
    })
  }

  return (
    <div className="App">
      <h1>Hello!</h1>
      {ejemplo()}
    </div>
  );
}

export default App;
