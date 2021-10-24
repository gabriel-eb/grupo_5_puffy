module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
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
