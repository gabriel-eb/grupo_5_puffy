module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductCategory';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productId: {
            type: dataTypes.INTEGER,
            field: "product_id",
            allowNull: false
        },
        categoryId: {
            type: dataTypes.INTEGER,
            field: "category_id",
            allowNull: false
        },
      
    };
    let config = {
        tableName: 'product_category',
        createdAt: false,
        updatedAt:false
    };
    const ProductCategory = sequelize.define(alias, cols, config)

    ProductCategory.associate = function(models) {
        ProductCategory.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'productId'
        }),

        ProductCategory.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'categoryId'
        });
    };

    
    return ProductCategory
}