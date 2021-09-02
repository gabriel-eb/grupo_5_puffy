const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Address = require('../database/models/Address');
const User = require('../database/models/User');

const Product = require('../database/models/Product');
const Cart = require('../database/models/Cart');
const Category = require('../database/models/Category');
const Product_cart = require('../database/models/Product_cart');
const Product_category = require('../database/models/Product_category');
const Product_images = require('../database/models/Product_images');
const Users = db.User;
const Addresses = db.Address;
const Orders = db.Order;
const Products = db.Product;
const Carts = db.Cart;
const Categories = db.Category;
const ProductCarts = db.Product_cart;
const ProductCat = db.Product_category;
const ProductImg = db.Product_images;



module.exports = {
    listUsers: async (req, res) => {
        return res.status(200).json(await Users.findAll());
    },
    getUser: async (req, res) => {
        return res.status(200).json(await Users.findByPk(req.params.id));
    },
    addUser: async (req, res) => {
        const userCreated = await Users.create(req.body);
        return res.status(201).json({ id: userCreated.id });
    },
    editUser: async (req, res) => {
        await Users.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return res.status(201).json({ msg: "Succesful changes!" });
    },
    deleteUser: async (req, res) => {
        await Users.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200)
            .json({ msg: `User with id ${req.params.id} removed.` });
    },


    listAddresses: async (req, res) => {
        return res.status(200).json(await Addresses.findAll());
    },
    getAddress: async (req, res) => {
        return res.status(200).json(await Addresses.findByPk(req.params.id));
    },
    addAddress: async (req, res) => {
        const addressCreated = await Addresses.create(req.body);
        return res.status(201).json({ id: addressCreated.id });
    },
    editAddress: async (req, res) => {
        await Addresses.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return res.status(201).json({ msg: "Succesful changes!" });
    },
    deleteAddress: async (req, res) => {
        await Addresses.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200)
            .json({ msg: `Address with id ${req.params.id} removed.` });
    },


    listOrders: async (req, res) => {
        return res.status(200).json(await Orders.findAll());
    },
    getOrder: async (req, res) => {
        return res.status(200).json(await Orders.findByPk(req.params.id));
    },
    addOrder: async (req, res) => {
        const orderCreated = await Orders.create(req.body);
        return res.status(201).json({ id: orderCreated.id });
    },
    editOrder: async (req, res) => {
        await Orders.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return res.status(201).json({ msg: "Succesful changes!" });
    },
    deleteOrder: async (req, res) => {
        await Orders.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200)
            .json({ msg: `Order with id ${req.params.id} removed.` });
    },
    listAllOrderInfo: async (req, res) => {
        const orderDetail = await Orders.findByPk(req.params.id, {
            include: ['address', 'user']
        });
        return res.status(200).json(orderDetail);
    },

    // CRUD Product

    listProducts: async (req, res) => {
        return res.status(200).json(await Products.findAll());
    },
    getProduct: async (req, res) => {
        return res.status(200).json(await Products.findByPk(req.params.id));
    },
    addProduct: async (req, res) => {
        const productCreated = await Products.create(req.body);
        return res.status(201).json({ id: productCreated.id });
    },
    editProduct: async (req, res) => {
        await Products.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return res.status(201).json({ msg: "Succesful changes!" });
    },
    deleteProduct: async (req, res) => {
        await Products.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200)
            .json({ msg: `Product with id ${req.params.id} removed.` });
    },


    listAllProductInfo: async (req, res) => {
        try {
            // const productDetail = await Products.findByPk(req.params.id, {
            //     include: [{ model: ProductCat, where: { productId: req.params.id } },
            //     { model: ProductImg, where: { productId: req.params.id } }]
            // });
            // return res.status(200).json(productDetail);
            return res.json({});
        }
        catch (error) {
            console.log(error)
        }
    }
    ,


    // CRUD Carrito

    listCarts: async (req, res) => {
        return res.status(200).json(await Carts.findAll());
    },
    getCart: async (req, res) => {
        return res.status(200).json(await Carts.findByPk(req.params.id));
    },
    addCart: async (req, res) => {
        const cartCreated = await Carts.create(req.body);
        return res.status(201).json({ id: cartCreated.id });
    },
    editCart: async (req, res) => {
        await Carts.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return res.status(201).json({ msg: "Succesful changes!" });
    },
    deleteCart: async (req, res) => {
        await Carts.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200)
            .json({ msg: `Cart with id ${req.params.id} removed.` });
    },

    // CRUD Category

    listCategories: async (req, res) => {
        return res.status(200).json(await Categories.findAll());
    },
    getCategory: async (req, res) => {
        return res.status(200).json(await Categories.findByPk(req.params.id));
    },
    addCategory: async (req, res) => {
        const categoryCreated = await Categories.create(req.body);
        return res.status(201).json({ id: categoryCreated.id });
    },
    editCategory: async (req, res) => {
        await Categories.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return res.status(201).json({ msg: "Succesful changes!" });
    },
    deleteCategory: async (req, res) => {
        await Categories.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200)
            .json({ msg: `Category with id ${req.params.id} removed.` });
    },

    // CRUD Product_cart


    listProductCarts: async (req, res) => {
        return res.status(200).json(await ProductCarts.findAll({
            include:["product","cart"]
        }));
    },
    getProductCart: async (req, res) => {
        return res.status(200).json(await ProductCarts.findByPk(req.params.id,{include:["product","cart"]}));
    },
    addProductCart: async (req, res) => {
        const productCartCreated = await ProductCarts.create(req.body);
        return res.status(201).json({ id: productCartCreated.id });
    },
    editProductCart: async (req, res) => {
        await ProductCarts.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return res.status(201).json({ msg: "Succesful changes!" });
    },
    deleteProductCart: async (req, res) => {
        await ProductCarts.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200)
            .json({ msg: `Category with id ${req.params.id} removed.` });
    },

    // CRUD Product_category


    listProductCats: async (req, res) => {
        return res.status(200).json(await ProductCat.findAll());
    },
    getProductCat: async (req, res) => {
        return res.status(200).json(await ProductCat.findByPk(req.params.id));
    },
    addProductCat: async (req, res) => {
        const productCatCreated = await ProductCat.create(req.body);
        return res.status(201).json({ id: productCatCreated.id });
    },
    editProductCat: async (req, res) => {
        await ProductCat.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return res.status(201).json({ msg: "Succesful changes!" });
    },
    deleteProductCat: async (req, res) => {
        await ProductCat.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200)
            .json({ msg: `Product category with id ${req.params.id} removed.` });
    },

    // CRUD Product_images


    listProductImgs: async (req, res) => {
        return res.status(200).json(await ProductImg.findAll());
    },
    getProductImg: async (req, res) => {
        return res.status(200).json(await ProductImg.findByPk(req.params.id));
    },
    addProductImg: async (req, res) => {
        const productImgCreated = await ProductImg.create(req.body);
        return res.status(201).json({ id: productImgCreated.id });
    },
    editProductImg: async (req, res) => {
        await ProductImg.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return res.status(201).json({ msg: "Succesful changes!" });
    },
    deleteProductImg: async (req, res) => {
        await ProductImg.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200)
            .json({ msg: `Product image with id ${req.params.id} removed.` });
    },


}