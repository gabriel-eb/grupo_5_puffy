import React from 'react';
import ContentSmallCard from './ContentSmallCard';
// import ContentCategories from './components/ContentCategories';
import ListProducts from './Products';
import LastProductCreated from './LastProductCreated';

function Dashboard() {
    return (
        <div style={{padding: "1rem"}}>
            <ContentSmallCard />
            {/* <ContentCategories /> */}
            <LastProductCreated />
            <ListProducts />
        </div>
    );
}

export default Dashboard;
