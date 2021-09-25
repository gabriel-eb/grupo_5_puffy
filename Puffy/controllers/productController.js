const db = require('../database/models');
const Products = db.Product;
const Categories = db.Category;
const ProductCat = db.Product_category;
const Images = db.Product_images;
const { validationResult } = require('express-validator');

const controller = {
    index: async (req, res) => {
        try {
            const productsList = await Products.findAll();
            const Img = await Images.findAll();

            if (req.session.userId) {
                const user = await db.User.findByPk(req.session.userId);
                const userIsAdmin = user.admin;
                return res.status(200).render("products/index", {
                    productsList,
                    Img,
                    userIsAdmin
                });
            }

            return res.status(200).render("products/index", { productsList, Img });

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
            const productDetail = await Products.findByPk(req.params.id);
            
            const category = await ProductCat.findOne({
                where: {
                    productId: req.params.id
                },
                include: [{
                    model: Categories, 
                    as: 'category',
                    attributes: ['name']
                }]
            });
            
            const image = await Images.findOne({
                where: {
                    productId: req.params.id,
                    main: true
                }
            });
            
            if (req.session.userId){
                const user = await db.User.findByPk(req.session.userId);
                const userIsAdmin = user.admin;
                return res.status(200).render("products/detalle", {
                    productDetail,
                    category,
                    image,
                    userIsAdmin
                });
            }

            return res.status(200).render("products/detalle", { productDetail, category, image });

        } catch (error) {
            console.log(error);
        }

    },
    vistaModificar: async (req, res) => {

        try {
            let producto = await Products.findOne({
                raw: true,
                where: {
                    id: req.params.id
                }
            });

            const prodCat = await ProductCat.findOne({
                where: { productId: req.params.id }
            });

            producto.category = prodCat.dataValues.categoryId;

            const categoriesList = await Categories.findAll();
            const categories = [];
            categoriesList.map(cat => categories.push(cat.dataValues));

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
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                const categoriesList = await Categories.findAll();
                const categories = [];
                categoriesList.map(cat => categories.push(cat.dataValues));
                req.body.description = req.body.description.trim();
                return res.status(401).render('products/agregar', {
                    errors: resultValidation.mapped(),
                    oldValues: req.body,
                    categories
                });
            }

            req.body.description = req.body.description.trim();

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
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                let producto = await Products.findOne({ where: { id: req.params.id } });
                producto = producto.dataValues;
                producto = { ...producto, ...req.body };
                const image = await Images.findOne({ where: { productId: req.params.id } });
                const categoriesList = await Categories.findAll();
                const categories = [];
                categoriesList.map(cat => categories.push(cat.dataValues));
                return res.status(401).render('products/modificar', {
                    errors: resultValidation.mapped(),
                    categories,
                    image,
                    producto
                });
            }

            await Products.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            const product_cat = {
                categoryId: req.body.category
            }
            await ProductCat.update(product_cat, {
                where: {
                    productId: req.params.id
                }
            });

            const productImage = {
                url: req.body.image,
                main: true
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