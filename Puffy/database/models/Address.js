module.exports = (sequelize, dataTypes) => {
    const alias = 'Address';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
            allowNull: false
        },
        line1: {
            type: dataTypes.STRING(250),
            allowNull: false
        },
        line2: {
            type: dataTypes.STRING(100)
        },
        city: {
            type: dataTypes.STRING(250),
            allowNull: false
        },
        state: {
            type: dataTypes.STRING(250),
            allowNull: false
        },
        country: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        zip: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: dataTypes.INTEGER,
            field: 'user_id',
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
        tableName: 'address',
        paranoid: true
    };

    const Address = sequelize.define(alias, cols, config);

    Address.associate = function(models) {
        Address.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        })
        Address.hasMany(models.Order, {
            as: 'order',
            foreignKey: 'addressId',
            onDelete: 'CASCADE'
        })
        Address.hasMany(models.Cart, {
            as: 'cart',
            foreignKey: 'addressId',
            onDelete: 'CASCADE'
        })
    }
    
    return Address;
}