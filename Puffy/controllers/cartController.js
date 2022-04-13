const { v4: uuidv4 } = require('uuid');
const { Op } = require("sequelize");
const db = require('../database/models');
const Users = db.User;
const Products = db.Product;
const Carts = db.Cart;
const Images = db.ProductImages;
const Addresses = db.Address;
const ProductCarts = db.ProductCart;
const Invited = db.Invited;
const InvitedAddress = db.InvitedAddress;
const CartsInvited = db.InvitedCart;

const estados = [
    'Aguascalientes', 'Baja California', 'Baja California Sur',
    'Campeche', 'Coahuila de Zaragoza', 'Colima', 'Chiapas',
    'Chihuahua', 'Ciudad de México', 'Durango', 'Guanajuato',
    'Guerrero', 'Hidalgo', 'Jalisco', 'Estado de México',
    'Michoacán de Ocampo', 'Morelos', 'Nayarit', 'Nuevo León',
    'Oaxaca de Juárez', 'Puebla', 'Querétaro', 'Quintana Roo',
    'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco',
    'Tamaulipas', 'Tlaxcala', 'Veracruz de Ignacio de la Llave',
    'Yucatán', 'Zacatecas'
]


const controller = {
    index: async (req, res) => {
        const userCart = req.user.id || req.session.invitedId;
        const cart = req.session.cart;
        if (userCart && cart && cart.length > 0) {
            return res.render('cart/carrito', { userCart, cart });
        }
        return res.render('cart/emptyCart');
    },
    addProduct: async (req, res) => {
        try {

            if(!req.user.id || !req.session.invitedId){
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
                const indProd = cart.findIndex(p => p.id === addedProd.id);
                if (indProd != -1){
                    cart[indProd] = { 
                        ...cart[indProd],
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
            const cartExist = await Carts.findOne({
                where: {
                    userId: req.user.id,
                    status: 0
                },
                raw: true
            });
            if(!cartExist){
                const newCart = await Carts.create({
                    status: 0,
                    userId: req.user.id
                });
                let addProducts = req.session.cart.map(item => {
                    return {
                        productId: item.id,
                        cartId: newCart.id
                    }
                })
                await ProductCarts.bulkCreate(addProducts);
            } else {
                let addProducts = req.session.cart.map(item => {
                    return {
                        productId: item.id,
                        cartId: cartExist.id
                    }
                })
                await ProductCarts.bulkCreate(addProducts);
            }
            return res.status(201).redirect('checkout/selectAddress')
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },
    selectingAddress: async (req, res) => {
        try {
            const addresses = await Addresses.findAll({ where: { userId: req.user.id } });
            return res.status(201).render('cart/selectAddress', { addresses, estados });
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },
    buyCart: async (req, res) => {

        try {
            const cart = await Carts.findOne({
                where: {
                    userId: req.user.id,
                    status: 0
                },
                raw: true
            });
            await Carts.update({ status: 1 }, { where: { id: cart.id } });

            const soldProducts = req.session.cart;
            req.session.cart = null;

            for (const product of soldProducts) {
                await Products.decrement(
                    { quantity: product.quantity }, 
                    { where: { id: product.id } }
                );
            }

            // TODO: crear orden

            return res.status(201).render('cart/agradecimiento');
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },
    selectedAddress: async (req, res) => {
        try {
            
            const cart = await Carts.findOne({
                where: {
                    userId: req.user.id,
                    status: 0
                },
                raw: true
            });

            const addressId = parseInt(req.body.addressId);

            if(addressId === -1){
                const newAddress = await Addresses.create({...req.body, userId: req.user.id});
                await Carts.update({ addressId: newAddress.id }, { where: { id: cart.id } });
            } else {
                await Carts.update({ addressId: addressId }, { where: { id: cart.id } });
            }

            await controller.buyCart(req, res);
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },
    checkout: async (req, res) => {
        // TODO: Transaction with user cart checkout: startCheckout, selectedAddress, buyCart
        try {
            return res.status(201).render('cart/agradecimiento');
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },
    invitedCheckout: (req, res) => {
        return res.status(200).render('cart/invitedCheckout',{exists: false});
    },
    createInvited: async (req, res) => {
        try {
            const user = await Users.findOne({
                where: {
                    email: {
                        [Op.like]: req.body.email
                    }
                }
            });

            if(user){
                return res.status(400).render('cart/invitedCheckout',{exists: true});
            }

            const invited = await Invited.create(req.body);
            
            return res.status(201).render('cart/invitedAddressCheckout', {invitedId: invited.id, estados});
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },
    createAddressInvited: async (req, res) => {
        try {
            const address = await InvitedAddress.create(req.body);
            req.body.addressId = address.id;
            this.buyCarInvited(req,res);
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    },
    buyCarInvited: async (req, res) => {
        try {
            const newCart = Object.create({
                status: 1,
                invitedId: req.body.invitedId,
                addressId: req.body.addressId
            },{})

            await CartsInvited.create(newCart);

            const soldProducts = req.session.cart || [];

            for (const product of soldProducts) {
                const productId = product[0];
                const productQuant = product[1];
                await Products.decrement(
                    { quantity: productQuant }, 
                    { where: { id: productId } }
                );
            }
            return res.status(201).render('cart/agradecimiento');
        } catch (error) {
            console.error(error);
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


