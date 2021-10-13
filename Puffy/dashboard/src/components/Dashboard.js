import React from 'react';
import Navbar from './Navbar'
import ContentSmallCard from './ContentSmallCard';
// import ContentCategories from './components/ContentCategories';
import ListProducts from './Products';
import LastProductCreated from './LastProductCreated';

function Dashboard() {
    return (
        <div>
            <Navbar />
            <ContentSmallCard />
            {/* <ContentCategories /> */}
            <LastProductCreated />
            <ListProducts />
        </div>
    );
}

export default Dashboard;
