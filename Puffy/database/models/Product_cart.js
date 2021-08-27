module.exports = (sequelize, dataTypes) => {
    let alias = 'Product_cart';
    let cols = {
        productId: {
            type: dataTypes.INTEGER,
            field:"product_id"
        },
        cartId: {
            type: dataTypes.INTEGER,
            field:"cart_id"
        },
        
    };
    let config = {
        tableName: 'product_cart'
    };
    const Product_cart = sequelize.define(alias, cols, config);

    Product_cart.associate = function(models) {
        Product_cart.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'productId'
        });

        Product_cart.belongsTo(models.Cart, {
            as: 'cart',
            foreignKey: 'cartId'
        });
    }

    return Product_cart;
}