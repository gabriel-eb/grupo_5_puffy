module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductCart';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId: {
            type: dataTypes.INTEGER,
            field:"product_id"
        },
        cartId: {
            type: dataTypes.INTEGER,
            field:"cart_id"
        },
        boughtQuantity: {
            type: dataTypes.INTEGER,
            field: "bought_quantity"
        }
        
    };
    let config = {
        tableName: 'product_cart',
        createdAt: false,
        updatedAt:false
    };
    const ProductCart = sequelize.define(alias, cols, config);

    ProductCart.associate = function(models) {
        ProductCart.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'productId'
        });

        ProductCart.belongsTo(models.Cart, {
            as: 'cart',
            foreignKey: 'cartId'
        });
    }

    return ProductCart;
}