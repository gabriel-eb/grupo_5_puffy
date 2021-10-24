module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        status: {
            type: dataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: dataTypes.INTEGER,
            field: 'user_id',
            allowNull: false
        },
        addressId: {
            type: dataTypes.INTEGER,
            field:'address_id'
        },
        createdAt: {
            type: dataTypes.DATE,
            field: 'created_at',
            allowNull: false
        },
        updatedAt: {
            type: dataTypes.DATE,
            field: 'updated_at',
            allowNull: false
        },
    };
    let config = {
        tableName: 'cart'
    };
    const Cart = sequelize.define(alias, cols, config)

    Cart.associate = function(models) {
        Cart.hasMany(models.ProductCart, {
            as: 'productCart',
            foreignKey: 'cartId',
            onDelete: 'CASCADE'
        });

        Cart.belongsTo(models.Address, {
            as: 'address',
            foreignKey: 'addressId'
        });
         
        Cart.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        });
         

    }


    return Cart
}