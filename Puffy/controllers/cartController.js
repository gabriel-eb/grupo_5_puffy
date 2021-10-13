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
                    addressId: userAddress ? userAddress.id : null
                }

                const createdCart = await Cart.create(newCart);

                await ProdCart.create({
                    productId: req.body.productId,
                    cartId: createdCart.id
                })
            }

            return res.status(201).redirect(`/users/${userId}/carrito`);
        } catch (error) {
            console.log(error);
            return res.status(500).redirect('error');
        }
    },
    vistaCarrito: async (req, res) => {
        try {
            const userCart = await Cart.findOne({
                where: {
                    userId: req.params.id,
                    status: 0
                }
            });

            if (userCart) {
                const cartProducts = await ProdCart.findAll({
                    where: {
                        cartId: userCart.dataValues.id
                    }
                })

                const productsId = [];
                cartProducts.map(prod => productsId.push(prod.dataValues.productId));

                const ProductsSelected = await Products.findAll({
                    where: {
                        id: productsId
                    }
                })

                const finalProducts = []
                ProductsSelected.map(p => finalProducts.push(p.dataValues))

                return res.render('carrito');
            }
            return res.render('emptyCart');
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    },
    buyCart: async (req, res) => {
        try {
            await Cart.update({ status: 1 }, {
                where: { userId: req.params.id, status: 0 }
            });
            return res.status(201).render('agradecimiento');
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    }
}

module.exports = controller;


