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
        createdAt: {
            type: dataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: dataTypes.DATE,
            field: 'updated_at'
        },
    };
    let config = {
        tableName: 'category'
    };
    const Category = sequelize.define(alias, cols, config)

    Category.associate = function(models) {
        Category.hasMany(models.ProductCategory, {
            as: 'productCategory',
            foreignKey: 'categoryId',
            onDelete: 'CASCADE'
        });
         
    }


    return Category;
}
