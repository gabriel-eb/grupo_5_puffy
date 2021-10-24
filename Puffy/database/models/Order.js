module.exports = (sequelize, dataTypes) => {
    const alias = 'Order';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        status: {
            type: dataTypes.STRING(10),
            allowNull: false
        },
        subtotal: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        discount: {
            type: dataTypes.FLOAT
        },
        tax: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        shipping: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        total: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        promo: {
            type: dataTypes.STRING(45)
        },
        promoDiscount: {
            type: dataTypes.FLOAT,
            field: 'promo_discount'
        },
        grandTotal: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        userId: {
            type: dataTypes.INTEGER,
            field: 'user_id',
            allowNull: false
        },
        addressId: {
            type: dataTypes.INTEGER,
            field: 'address_id',
            allowNull: false
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