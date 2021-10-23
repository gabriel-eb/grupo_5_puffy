module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductImages';
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
    const ProductImages = sequelize.define(alias, cols, config);

    ProductImages.associate = function(models) {
        ProductImages.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'productId'
        });
    }



    return ProductImages;
}