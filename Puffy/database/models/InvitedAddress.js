module.exports = (sequelize, dataTypes) => {
    const alias = 'InvitedAddress';
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
        invitedId: {
            type: dataTypes.INTEGER,
            field: 'invited_id',
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
        tableName: 'invitedAddress',
    };

    const InvitedAddress = sequelize.define(alias, cols, config);

    InvitedAddress.associate = function(models) {
        InvitedAddress.belongsTo(models.Invited, {
            as: 'invited',
            foreignKey: 'invitedId'
        })
        InvitedAddress.hasMany(models.InvitedCart, {
            as: 'cart',
            foreignKey: 'addressId',
            onDelete: 'CASCADE'
        })
    }
    
    return InvitedAddress;
}