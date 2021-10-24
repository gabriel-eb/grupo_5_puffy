module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductCart';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productId: {
            type: dataTypes.INTEGER,
            field: "product_id",
            allowNull: false
        },
        cartId: {
            type: dataTypes.INTEGER,
            field:"cart_id"
        },
        invitedCartId: {
            type: dataTypes.INTEGER,
            field: "invited_cart_id"
        },
        cartType: {
            type: dataTypes.BOOLEAN,
            field: "cart_type",
            allowNull: false
        },
        boughtQuantity: {
            type: dataTypes.INTEGER,
            field: "bought_quantity",
            allowNull: false
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

        ProductCart.belongsTo(models.InvitedCart, {
            as: 'invitedCart',
            foreignKey: 'invitedCartId'
        });
    }

    return ProductCart;
}