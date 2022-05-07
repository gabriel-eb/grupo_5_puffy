const db = require('../database/models');
const Users = db.User;
const Products = db.Product;
const Categories = db.Category;
const ProductCat = db.ProductCategory
const Images = db.ProductImages;
const Carts = db.Cart;
const ProductCarts = db.ProductCart;

module.exports = {
    getIsAdmin: async (req, res) => {
        try {
            if('user' in req && req.user.admin){
                return res.status(200).json({ isAdmin: true });
            } else {
                return res.status(403).json({ isAdmin: false });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },
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
    getLastUser: async (req, res) => {
        try {
            const user = await Users.findOne({ order: [['createdAt', 'DESC']] });
            const apiResponse = Object.assign(
                {},
                {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    url: user.avatar,
                    createdAt: user.createdAt
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
                attributes: ['id', 'name', 'description','createdAt','price','quantity',],
                include: [{
                    model: ProductCat,
                    as: 'productCategory',
                    include: [{
                        model: Categories,
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
                    categories: product.productCategory.map(cat => cat.category.name),
                    createdAt: product.createdAt,
                    price:product.price,
                    quantity:product.quantity,
                    detail: `/dashboard/products/${product.id}`,
                    
                })
            })

            const categories = await Categories.findAll({
                raw: true,
                attributes: ['id', 'name']
            });
            const prodCategory = await ProductCat.findAll({raw: true});

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
                    model: Images,
                    as: 'productImages',
                    where: { main: true }
                }, {
                    model: ProductCat,
                    as: 'productCategory',
                    attributes: ['categoryId']
                }]

            });

            const apiResponse = Object.assign(
                {},
                {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    size: product.size,
                    quantity: product.quantity,
                    category: product.productCategory[0].categoryId,
                    discount: product.discount,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                    url: product.productImages[0].url
                }
            );

            return res.status(200).json(apiResponse);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }, 
    getAllCategories: async (req, res) => {
        try {
            let categories = await Categories.findAll({
                attributes: ['id', 'name'],
                raw: true
            });
            return res.status(200).json(categories);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },
    createProduct: async (req, res) => {
        try {
            req.body.description = req.body.description.trim();
            const addedProduct = await Products.create(req.body);

            const productWithCat = {
                productId: addedProduct.dataValues.id,
                categoryId: req.body.category
            }
            await ProductCat.create(productWithCat);

            const productImage = {
                url: req.body.image || "/images/avatars/default.jpg",
                main: true,
                productId: addedProduct.dataValues.id
            }
            await Images.create(productImage);

            return res.status(201).json(1);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },
    updateProduct: async (req, res) => {
        try {
            await Products.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            await ProductCat.update(
                {
                    categoryId: req.body.category
                }, {
                where: {
                    productId: req.params.id
                }
            });

            if (req.body.image != "null") {
                await Images.update(
                    { 
                        url: req.body.image 
                    }, { 
                        where: { productId: req.params.id } 
                    });
            }

            return res.status(204).json(1);

        } catch (error) {
            console.log(error);
            return res.status(500).json({});
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.destroy({ where: { id: req.params.id } });
            return res.status(201).json(1);
        } catch (error) {
            console.log(error);
            return res.status(500).json({});
        }
    },
    getSales: async (req, res) => {
        try {
            const completeSale = await Carts.findAll({
                where: { status: "1" },
                attributes: ['id', 'userId'],
                include:[{
                    model: ProductCarts,
                    as: 'productCart',
                    attributes: ['id', 'productId'],
                    include: [{
                        model: Products,
                        as: 'product',
                        attributes: ['name']
                    }]
                }]
            });

            // Count total sales
            let totalSales = 0;
            completeSale.map(cart => totalSales += cart.productCart.length)

            // Get and sort top products
            const topProducts = {};
            completeSale.map(({ productCart }) => {
                productCart.map( sale =>{
                    const i = sale.productId;
                    topProducts[i] = {
                        count: (topProducts[i] ? topProducts[i].count : 0) + 1,
                        name: sale.product.name
                    }
                })
            });

            // src: https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
            const sortedInArray = Object.entries(topProducts).sort(([, a], [, b]) => b.count - a.count)
            const topProductsSorted = sortedInArray.map(prod => {
                const temp = {
                    id: prod[0],
                    name: prod[1].name,
                    count: prod[1].count
                }
                return temp;
            })

            // Create object response
            const apiResponse = {
                totalSales,
                topProducts: topProductsSorted.slice(0, 5)
            }

            return res.status(200).json(apiResponse);
        } catch (error) {
            console.log(error);
            return res.status(500).json({});
        }
    }
}