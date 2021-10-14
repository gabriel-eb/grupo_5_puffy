import React from 'react';
import ContentSmallCard from './ContentSmallCard';
import ContentCategories from './ContentCategories';
import ListProducts from './Products';
import LastProductCreated from './LastProductCreated';

function Dashboard() {
    return (
        <div style={{ padding: "1rem" }}>
                <ContentSmallCard />
            <div className="row">
                <LastProductCreated />
                <ContentCategories />
            </div>
            <ListProducts />
        </div>
    );
}

export default Dashboard;
