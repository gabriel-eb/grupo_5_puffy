module.exports = (sequelize, dataTypes) => {
    let alias = 'Product_category';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId: {
            type: dataTypes.INTEGER,
            field:"product_id"
        },
        categoryId: {
            type: dataTypes.INTEGER,
            field:"category_id"
        },
      
    };
    let config = {
        tableName: 'product_category'
    };
    const Product_category = sequelize.define(alias, cols, config)

    Product_category.associate = function(models) {
        Product_category.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'productId'
        }),

        Product_category.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'categoryId'
        });
    };

    
    return Product_category
}