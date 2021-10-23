const db = require('../database/models');
const Products = db.Product;
const Carts = db.Cart;
const Address = db.Address;
const ProdCarts = db.ProductCart;
const Images = db.ProductImages


const controller = {
    index: (req, res) => {
        res.status(200).render("carrito");
    },
    addProduct: async (req, res) => {
        try {
            const userId = req.session.userId;
            const cartCreated = await Carts.findOne({
                where: {
                    userId: userId,
                    status: '0',
                }
            });


            if (cartCreated) {
                await ProdCarts.create({
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

                const createdCart = await Carts.create(newCart);

                await ProdCarts.create({
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
            const userCart = await Carts.findOne({
                where: {
                    userId: req.params.id,
                    status: 0
                }
            });

            if (userCart) {
                const cartProducts = await ProdCarts.findAll({
                    where: {
                        cartId: userCart.dataValues.id
                    }
                })

                const productsId = [];
                cartProducts.map(prod => productsId.push(prod.dataValues.productId));
                const countEachProd = {};
                productsId.map(i => countEachProd[i] = (countEachProd[i] || 0) + 1);

                const ProductsSelected = await Products.findAll({
                    where: {
                        id: productsId
                    },
                    include: [{
                        model: Images,
                        as: 'productImages',
                        where: { main: true }
                    }]
                })

                const finalProducts = []
                ProductsSelected.map(p => {

                    const temp = Object.assign({}, {
                        id: p.id,
                        name: p.name,
                        price: p.price,
                        url: p.productImages[0].url,
                        quantity: countEachProd[p.id],
                        instock: p.quantity
                    });
                    finalProducts.push(temp)
                });

                const priceProducts = [];
                ProductsSelected.map(p => priceProducts.push(p.price * countEachProd[p.id]))
                const totalPrice = priceProducts.reduce(function (a, b) { return a + b; });

                const count = productsId.length;

                return res.render('carrito', { userCart, finalProducts, totalPrice, count, idCarrito: userCart.id });
            }
            return res.render('emptyCart');
        }

        catch (error) {
            console.log(error);
            return res.status(500);
        }
    },
    buyCart: async (req, res) => {
        try {
            const cart = await Carts.findOne({
                where: {
                    userId: req.params.id,
                    status: 0
                },
                raw: true
            });
            await Carts.update({ status: 1 }, { where: { id: cart.id } });

            const soldProducts = Object.entries(req.body);

            for (const product of soldProducts) {
                const productId = product[0];
                const productQuant = product[1];
                await Products.decrement(
                    { quantity: productQuant }, 
                    { where: { id: productId } }
                );
            }

            return res.status(201).render('agradecimiento');
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await ProdCarts.destroy({
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


