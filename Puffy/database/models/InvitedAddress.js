module.exports = (sequelize, dataTypes) => {
    const alias = 'InvitedAddress';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        line1: {
            type: dataTypes.STRING(250)
        },
        line2: {
            type: dataTypes.STRING(100)
        },
        city: {
            type: dataTypes.STRING(250)
        },
        state: {
            type: dataTypes.STRING(250)
        },
        country: {
            type: dataTypes.STRING(100)
        },
        zip: {
            type: dataTypes.INTEGER,
        },
        invitedId: {
            type: dataTypes.INTEGER,
            field: 'invited_id'
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
        tableName: 'invitedAddress',
    };

    const InvitedAddress = sequelize.define(alias, cols, config);

    InvitedAddress.associate = function(models) {
        InvitedAddress.belongsTo(models.Invited, {
            as: 'invited',
            foreignKey: 'invitedId'
        })
        Address.hasMany(models.InvitedCart, {
            as: 'cart',
            foreignKey: 'addressId',
            onDelete: 'CASCADE'
        })
    }
    
    return InvitedAddress;
}