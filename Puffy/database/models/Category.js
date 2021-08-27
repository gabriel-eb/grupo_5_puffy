module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
        },
        created_at: {
            type: dataTypes.DATE,
            field: 'created_at'
        },
        updated_at: {
            type: dataTypes.DATE,
            field: 'updated_at'
        },
    };
    let config = {
        tableName: 'category'
    };
    const Category = sequelize.define(alias, cols, config)

    Category.associate = function(models) {
        Category.hasMany(models.Product_category, {
            as: 'product_category',
            foreignKey: 'categoryId'
        });
         
    }


    return Category;
}
