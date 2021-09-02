module.exports = (sequelize, dataTypes) => {
    let alias = 'Product_images';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: {
            type: dataTypes.STRING(250),
        },
        main:{
            type:dataTypes.BOOLEAN
        },
        productId:{
            type:dataTypes.INTEGER,
            field:"product_id"
        }
        
    };
    let config = {
        tableName: 'product_images',
        createdAt: false,
        updatedAt:false
    };
    const Product_images = sequelize.define(alias, cols, config);

    Product_images.associate = function(models) {
        Product_images.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'productId'
        });
    }



    return Product_images;
}