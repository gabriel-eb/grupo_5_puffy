module.exports = (sequelize, dataTypes) => {
    const alias = 'Product';
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
        description: {
            type: dataTypes.TEXT
        },
        price: {
            type: dataTypes.DOUBLE,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: dataTypes.FLOAT
        },
        size:{
            type:dataTypes.BOOLEAN
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
    const config = {
        tableName: 'product',
        paranoid: false
        // paranoid: true
    };
    const Product = sequelize.define(alias, cols, config)


    Product.associate = function(models) {
        Product.hasMany(models.ProductCategory, {
            as: 'productCategory',
            foreignKey: 'productId',
            onDelete: 'CASCADE'
        });

        Product.hasMany(models.ProductCart, {
            as: 'productCart',
            foreignKey: 'productId',
            onDelete: 'CASCADE'
        });

        Product.hasMany(models.ProductImages, {
            as: 'productImages',
            foreignKey: 'productId',
            onDelete: 'CASCADE'
        });
         
    }


    return Product
}