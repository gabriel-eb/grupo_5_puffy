module.exports = (sequelize, dataTypes) => {
    let alias = 'InvitedCart';
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
        invitedId: {
            type: dataTypes.INTEGER,
            field: 'invited_id',
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
        },
    };
    let config = {
        tableName: 'invited_cart'
    };
    const InvitedCart = sequelize.define(alias, cols, config)

    InvitedCart.associate = function(models) {
        InvitedCart.hasMany(models.ProductCart, {
            as: 'productCart',
            foreignKey: 'invitedCartId',
            onDelete: 'CASCADE'
        });
         
        InvitedCart.belongsTo(models.Invited, {
            as: 'invited',
            foreignKey: 'invitedId'
        });

        InvitedCart.belongsTo(models.InvitedAddress, {
            as: 'address',
            foreignKey: 'addressId'
        });         

    }


    return InvitedCart;
}