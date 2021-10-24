module.exports = (sequelize, dataTypes) => {
    const alias = 'Invited';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(250),
            allowNull: false
        },
        mobile: {
            type: dataTypes.STRING(15)
        },
        email: {
            type: dataTypes.STRING(45)
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
        tableName: 'invited'
    };

    const Invited = sequelize.define(alias, cols, config);

    Invited.associate = function (models) {
        Invited.hasOne(models.InvitedAddress, {
            as: 'invitedAddress',
            foreignKey: 'invitedId',
            onDelete: 'CASCADE'
        });

    }

    return Invited;
}