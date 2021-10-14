import React from 'react';
import ContentSmallCard from './ContentSmallCard';
import ContentCategories from './ContentCategories';
import ListProducts from './Products';
import LastProductCreated from './LastProductCreated';
import ContentSales from './ContentSales';

function Dashboard() {
    return (
        <div style={{ padding: "1rem"}}>
                <ContentSmallCard />
            <div className="row d-flex align-items-center">
                <LastProductCreated />
                <div className="col-lg-6 mb-4">
                    <div className="row">
                        <ContentCategories />
                        <ContentSales />
                    </div>
                </div>
                {/** TODO: crear la api y tarjeta para conteo de ventas */}
            </div>
            <ListProducts />
        </div>
    );
}

export default Dashboard;
