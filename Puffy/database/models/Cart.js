module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sessionId: {
            type: dataTypes.STRING(100),
        },
        token: {
            type: dataTypes.STRING(150),
        },
        status: {
           // type: dataTypes.STRING(10)
        },
        userId: {
            type: dataTypes.INTEGER,
            field:'user_id'
        },
        addressId: {
            type: dataTypes.INTEGER,
            field:'adress_id'
        },
        created_at: {
            type: dataTypes.DATE,
            field: 'created_at'
        },
        updated_at: {
            type: dataTypes.DATE,
            field: 'updated_at'
        },
    };
    let config = {
        tableName: 'cart'
    };
    const Cart = sequelize.define(alias, cols, config)

    Cart.associate = function(models) {
        Cart.hasMany(models.Product_cart, {
            as: 'product_cart',
            foreignKey: 'cartId'
        });
         
        Cart.hasOne(models.Product_cart, {
            as: 'product_cart',
            foreignKey: 'userId'
        });
         

    }


    return Cart
}