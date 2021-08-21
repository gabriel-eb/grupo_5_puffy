module.exports = (sequelize, dataTypes) => {
    const alias = 'User';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: dataTypes.STRING(50),
            field: 'first_name'
        },
        lastName: {
            type: dataTypes.STRING(100),
            field: 'last_name'
        },
        mobile: {
            type: dataTypes.STRING(15)
        },
        email: {
            type: dataTypes.STRING(45)
        },
        password: {
            type: dataTypes.STRING(45)
        },
        admin: {
            type: dataTypes.BOOLEAN,
        },
        lastLogin: {
            type: dataTypes.DATE,
            field: 'last_login'
        },
        createdAt: {
            type: dataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: dataTypes.DATE,
            field: 'updated_at'
        },
        avatar: {
            type: dataTypes.STRING(100)
        }
    };
    const config = {
        tableName: 'user'
    };

    User.associate = function(models) {
        User.hasMany(models.Address, {
            as: 'addresses',
            foreignKey: 'user_id'
        });
        User.hasMany(models.Order, {
            as: 'orders',
            foreignKey: 'user_id'
        });
    }

    return sequelize.define(alias, cols, config);
}