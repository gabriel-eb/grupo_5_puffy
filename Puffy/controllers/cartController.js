
const db = require('../database/models');
const Carts = db.Cart;
const ProductCart=db.Product_cart;
const Images=db.Product_images;
const Products=db.Product;
const User=db.User;
const { validationResult } = require('express-validator');

module.exports = {
    vistaCarrito: async (req, res) => {
        try {
            const Cart = await Carts.findOne({
                where: {
                    userId: req.params.id,
                }
            });

            
            const CartProducts = await ProductCart.findAll({
                where:{
                    cartId : Cart.dataValues.id
                }
            })

            const productsId = [];
            CartProducts.map(prod => productsId.push(prod.dataValues.productId));

            const ProductsSelected = await Products.findAll({
                where:{
                    id:productsId
                }
            })

            const finalProducts =[]
            ProductsSelected.map(p=>finalProducts.push(p.dataValues))


            
            console.log(Cart);
            console.log(CartProducts)
            console.log(productsId)
            console.log(ProductsSelected);
            console.log(finalProducts);
            
            // return res.render('users/addresses/index', { Cart });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },
    
}