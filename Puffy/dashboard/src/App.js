import React from 'react';
import './App.css';
import Navegation from './components/Navegation';
import Navbar from './components/Navbar'
import ContentSmallCard from './components/ContentSmallCard';
// import ContentCategories from './components/ContentCategories';
import ListProducts from './components/Products';
import LastProductCreated from './components/LastProductCreated';

function App() {
    return (
      <div className="container-fluid">
        <Navegation />
        <Navbar />
        <ContentSmallCard />
        {/* <ContentCategories /> */}
        <LastProductCreated/>
        <ListProducts />
      </div>
    );
}

export default App;
