const sequelize = require('sequelize');
const db = require('../database/models');
const { Op } = require("sequelize");
const Users = db.User;
const Products = db.Product;
const Images = db.Product_images;
const Cart = db.Cart;
const Address = db.Address;
const ProdCart = db.Product_cart;



const controller = {
    index: (req, res) => {
        res.status(200).render("carrito");
    },
    addProduct: async (req, res) => {
        try {
            const userId = req.session.userId;
            const cartCreated = await Cart.findOne({
                where: {
                    userId: userId,
                    status: '0',
                }
            });


            if (cartCreated) {
                await ProdCart.create({
                    productId: req.body.productId,
                    cartId: cartCreated.id
                })
            } else {
                const userAddress = await Address.findOne({
                    where: { userId: userId },
                    attributes: ['id']
                })

                const newCart = {
                    userId: userId,
                    status: '0',
                    addressId: userAddress.id
                }

                const createdCart = await Cart.create(newCart);
                await ProdCart.create({
                    productId: req.body.productId,
                    cartId: createdCart.id
                })
            }

            return res.status(201).redirect('/');
        } catch (error) {
            console.log(error);
            return res.status(500).redirect('error');
        }
    },
    vistaCarrito: async (req, res) => {
        try {
            const Carts = await Cart.findOne({
                where: {
                    userId: req.params.id,
                }
            });


            const CartProducts = await ProdCart.findAll({
                where: {
                    cartId: Carts.dataValues.id
                }
            })

            const productsId = [];
            CartProducts.map(prod => productsId.push(prod.dataValues.productId));

            const ProductsSelected = await Products.findAll({
                where: {
                    id: productsId

                },
                include: [{
                    model: db.Product_images,
                    as: 'product_images',
                    where: { main: true }
                }]
            })

            const finalProducts = []
            ProductsSelected.map(p => finalProducts.push(p.dataValues))

            const priceProducts = [];
            ProductsSelected.map(p => priceProducts.push(p.dataValues.price))
            const totalPrice = priceProducts.reduce(function (a, b) { return a + b; });

            const count = priceProducts.length;


            return res.render('carrito', { Carts,finalProducts, totalPrice, count, idCarrito: Carts.id });
        }

        catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },

    deleteProduct: async (req, res) => {

        try {

            await ProdCart.destroy({
                where: {
                    cartId: req.params.idCarrito,
                    productId: req.query.idProduct
                }

            });

            return res.redirect('/');
        } catch (error) {
            console.log(error);
        }

    },
}

module.exports = controller;


