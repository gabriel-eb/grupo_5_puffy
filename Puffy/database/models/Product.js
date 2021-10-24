module.exports = (sequelize, dataTypes) => {
    const alias = 'Product';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(250)
            
        },
        description: {
            type: dataTypes.TEXT
            
        },
        price: {
            type: dataTypes.DOUBLE
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        discount: {
            type: dataTypes.FLOAT
        },
        size:{
            type:dataTypes.BOOLEAN

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
    const config = {
        tableName: 'product',
        paranoid: true
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