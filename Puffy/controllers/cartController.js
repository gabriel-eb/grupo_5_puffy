const { v4: uuidv4 } = require('uuid');
const db = require('../database/models');
const Products = db.Product;
const Carts = db.Cart;
const Address = db.Address;
const ProdCarts = db.ProductCart;
const Images = db.ProductImages;


const controller = {
    index: async (req, res) => {
        const userCart = req.session.userId || req.session.invitedId;
        const cart = req.session.cart;
        if (userCart && cart && cart.length > 0) {
            const userType = req.session.userId ? 1 : 0;
            return res.render('carrito', { userCart, userType, cart });
        }
        return res.render('emptyCart');
    },
    addProduct: async (req, res) => {
        try {

            if(!req.session.userId || !req.session.invitedId){
                req.session.invitedId = uuidv4();
            }

            const cart = req.session.cart || [];
            
            const addedProd = await Products.findOne({
                where: {
                    id: req.body.productId
                },
                include: [{
                    model: Images,
                    as: 'productImages',
                    where: { main: true }
                }]
            });

            if (addedProd) {
                if (cart.length < 1) {
                    cart.push({
                        id: addedProd.id,
                        name: addedProd.name,
                        price: addedProd.price,
                        url: addedProd.productImages[0].url,
                        quantity: 1,
                        instock: addedProd.quantity - 1
                    });
                } else {
                    const indProd = cart.findIndex(p => p.id === addedProd.id);
                    if (indProd != -1){
                        cart[indProd] = { 
                            ...cart[indProd],
                            price: addedProd.price,
                            quantity: cart[indProd].quantity + 1,
                            instock: addedProd.quantity - 1
                        };
                    } else {
                        cart.push({
                            id: addedProd.id,
                            name: addedProd.name,
                            price: addedProd.price,
                            url: addedProd.productImages[0].url,
                            quantity: 1,
                            instock: addedProd.quantity - 1
                        });
                    }
                }

                // await Products.decrement(
                //     { quantity: 1 },
                //     { where: { id: addedProd.id } }
                // );

                req.session.cart = cart;

                return res.status(200).redirect(req.get('referer'));
            } 
            
            console.error("Product ID not found.")
            return res.status(404);

        } catch (error) {
            console.log(error);
            return res.status(500).redirect('error');
        }
    },
    startCheckout: async (req, res) => {
        try {
            
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },
    buyCart: async (req, res) => {

        /**
         * TODO: create new logic for process and buy cart
         */
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
    increase: (req, res) => {
        const cart = req.session.cart;
        const indProd = cart.findIndex(({ id }) => id == req.params.prodId);
        if (indProd != -1) {
            cart[indProd].quantity++;
            cart[indProd].instock--;
        }
        req.session.cart = cart;
        return res.end();
    },
    decrease: (req, res) => {
        console.log(req.session.cart)
        const cart = req.session.cart;
        const indProd = cart.findIndex(({ id }) => id == req.params.prodId);
        if (indProd != -1) {
            cart[indProd].quantity--;
            cart[indProd].instock++;
        } 
        req.session.cart = cart; 
        return res.end();
    }
}

module.exports = controller;


