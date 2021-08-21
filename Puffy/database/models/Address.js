module.exports = (sequelize, dataTypes) => {
    const alias = 'Address';
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
        userId: {
            type: dataTypes.INTEGER,
            field: 'user_id'
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
        tableName: 'address'
    };
    
    return sequelize.define(alias, cols, config);
}