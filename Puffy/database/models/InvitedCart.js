module.exports = (sequelize, dataTypes) => {
    let alias = 'InvitedCart';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: dataTypes.STRING,
        },
        invitedId: {
            type: dataTypes.INTEGER,
            field:'invited_id'
        },
        addressId: {
            type: dataTypes.INTEGER,
            field:'address_id'
        },
        createdAt: {
            type: dataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: dataTypes.DATE,
            field: 'updated_at'
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

        Cart.belongsTo(models.InvitedAddress, {
            as: 'address',
            foreignKey: 'addressId'
        });         

    }


    return InvitedCart;
}