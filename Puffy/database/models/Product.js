module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
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
        //productImg: {
          //  type: dataTypes.STRING(100)
        //}
    };
    let config = {
        tableName: 'product'
    };
    const Product = sequelize.define(alias, cols, config)


    Product.associate = function(models) {
        Product.hasMany(models.Product_category, {
            as: 'product_category',
            foreignKey: 'productId'
        });

        Product.hasMany(models.Product_cart, {
            as: 'product_cart',
            foreignKey: 'productId'
        });

        Product.hasMany(models.Product_images, {
            as: 'product_images',
            foreignKey: 'productId'
        });
         
    }


    return Product
}