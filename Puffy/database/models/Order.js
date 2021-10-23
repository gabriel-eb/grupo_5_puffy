module.exports = (sequelize, dataTypes) => {
    const alias = 'Order';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: dataTypes.STRING(10)
        },
        subtotal: {
            type: dataTypes.FLOAT
        },
        discount: {
            type: dataTypes.FLOAT
        },
        tax: {
            type: dataTypes.FLOAT
        },
        shipping: {
            type: dataTypes.FLOAT
        },
        total: {
            type: dataTypes.FLOAT
        },
        promo: {
            type: dataTypes.STRING(45)
        },
        promoDiscount: {
            type: dataTypes.FLOAT,
            field: 'promo_discount'
        },
        grandTotal: {
            type: dataTypes.FLOAT
        },
        userId: {
            type: dataTypes.INTEGER,
            field: 'user_id'
        },
        addressId: {
            type: dataTypes.INTEGER,
            field: 'address_id'
        },
        createdAt: {
            type: dataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: dataTypes.DATE,
            field: 'updated_at'
        }
    };
    const config = {
        tableName: 'order'
    };

    const Order = sequelize.define(alias, cols, config);

    Order.associate = function(models) {
        Order.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        });
        Order.belongsTo(models.Address, {
            as: 'address',
            foreignKey: 'addressId'
        });
    }

    return Order;
}