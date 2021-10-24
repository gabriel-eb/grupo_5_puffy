module.exports = (sequelize, dataTypes) => {
    const alias = 'User';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: dataTypes.STRING(50),
            field: 'first_name',
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING(100),
            field: 'last_name',
            allowNull: false
        },
        mobile: {
            type: dataTypes.STRING(15)
        },
        email: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        admin: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
        lastLogin: {
            type: dataTypes.DATE,
            field: 'last_login',
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
        avatar: {
            type: dataTypes.STRING(100)
        }
    };
    const config = {
        tableName: 'user'
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.hasMany(models.Address, {
            as: 'address',
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
        User.hasMany(models.Order, {
            as: 'order',
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });

        User.hasOne(models.Cart, {
            as: 'cart',
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });

    }

    return User;
}