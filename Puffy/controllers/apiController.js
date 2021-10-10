const db = require('../database/models');
const Users = db.User;
const Products = db.Product;

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            let users = await Users.findAll({
                attributes: ['id', 'firstName', 'lastName', 'email'],
                raw: true
            });

            users.map(user => user.detail = `/dashboard/users/${user.id}`);

            const apiResponse = Object.assign(
                {},
                {
                    count: users.length,
                    users
                }
            );
            return res.status(200).json(apiResponse);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findByPk(req.params.id, { raw: true });
            const apiResponse = Object.assign(
                {},
                {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    mobile: user.mobile,
                    email: user.email,
                    lastLogin: user.lastLogin,
                    createdAt: user.createdAt,
                    url: user.avatar
                }
            );
            return res.status(200).json(apiResponse);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },
    getAllProducts: async (req, res) => {
        try {
            let products = await Products.findAll({
                attributes: ['id', 'name', 'description'],
                include: [{
                    model: db.Product_category,
                    as: 'product_category',
                    include: [{
                        model: db.Category,
                        as: 'category',
                        attributes: ['name'],
                    }],
                }]
            });

            products = products.map(product => {
                return Object.assign({}, {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    categories: product.product_category.map(cat => cat.category.name),
                    createdAt: product.createdAt,
                    detail: `/dashboard/products/${product.id}`
                })
            })

            const categories = await db.Category.findAll({
                raw: true,
                attributes: ['id', 'name']
            });
            const prodCategory = await db.Product_category.findAll({raw: true});

            let countByCategory = {};

            categories.map(category => {
                const acum = prodCategory.filter(c => c.categoryId === category.id);
                countByCategory[category.name] = acum.length;
            })

            const apiResponse = Object.assign(
                {},
                {
                    count: products.length,
                    countByCategory,
                    products
                }
            );
            return res.status(200).json(apiResponse);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },
    getProduct: async (req, res) => {
        try {
            const product = await Products.findByPk(req.params.id, {
                include: [{
                    model: db.Product_images,
                    as: 'product_images',
                    where: { main: true }
                }]

            });
            const apiResponse = Object.assign(
                {},
                {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: product.quantity,
                    discount: product.discount,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                    url: product.product_images[0].url
                }
            );

            return res.status(200).json(apiResponse);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },
    createProduct: (req, res) => {
        console.log(req.body);
        return res.status(201).json(1);
    }
}