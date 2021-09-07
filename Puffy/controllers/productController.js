const db = require('../database/models');
const Products = db.Product;
const Categories = db.Category;
const ProductCat = db.Product_category;
const Images = db.Product_images;

const controller = {
    index: async (req, res) => {
        try {
            const productsList = await Products.findAll();
            const Img = await Images.findAll();
            res.status(200).render("products/index", { productsList, Img });

        } catch (error) {
            console.log(error);
        }
    },
    delete: async (req, res) => {

        try {

            await ProductCat.destroy({
                where: {
                    productId: req.params.id
                }

            });

            await Images.destroy({
                where: {
                    productId: req.params.id
                }

            });

            await Products.destroy({
                where: {
                    id: req.params.id
                }
            })
            return res.redirect('/productos');
        } catch (error) {
            console.log(error);
        }

    },
    vistaAgregar: async (req, res) => {
        try {
            const categoriesList = await Categories.findAll();
            const categories = [];
            categoriesList.map(cat => categories.push(cat.dataValues));
            res.status(200).render("products/agregar", { categories });

        } catch (error) {
            console.log(error);
        }

    },
    detalle: async (req, res) => {
        try {
            const productDetail = await Products.findOne({
                where: {
                    id: req.params.id
                }
            });

            const categories = await ProductCat.findOne({
                where: {
                    productId: req.params.id
                }
            });

            const image = await Images.findOne({
                where: {
                    productId: req.params.id
                }
            });


            res.status(200).render("products/detalle", { productDetail, categories, image });

        } catch (error) {
            console.log(error);
        }

    },
    vistaModificar: async (req, res) => {

        try {
            const producto = await Products.findOne({
                where: {
                    id: req.params.id
                }
            });


            const categories = await ProductCat.findOne({
                where: {
                    productId: req.params.id
                }
            });

            const image = await Images.findOne({
                where: {
                    productId: req.params.id
                }
            });

            res.status(200).render("products/modificar", { producto, categories, image });

        } catch (error) {
            console.log(error);
        }

    },
    agregar: async (req, res) => {
        try {
            const addedProduct = await Products.create(req.body);

            const product_cat = {
                productId: addedProduct.dataValues.id,
                categoryId: req.body.category
            }
            await ProductCat.create(product_cat);

            const productImage = {
                url: req.body.image || "/images/avatars/default.jpg",
                main: true,
                productId: addedProduct.dataValues.id
            }
            await Images.create(productImage);

            return res.redirect('/productos');
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    },


    modificar: async (req, res) => {

        try {
            const updatedProduct = await Products.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            const product_cat = {
                productId: req.params.id,
                categoryId: req.body.category
            }
            await ProductCat.update(product_cat, {
                where: {
                    productId: req.params.id
                }
            }
            );

            const productImage = {
                url: req.body.image,
                main: true,
                productId: req.params.id
            }
            await Images.update(productImage, {
                where: {
                    productId: req.params.id
                }
            });

            return res.redirect('/productos');


        } catch (error) {
            console.log(error);
        }

    },
};


module.exports = controller;