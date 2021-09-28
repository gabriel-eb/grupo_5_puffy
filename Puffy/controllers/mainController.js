const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const sequelize = require('sequelize');
const db = require('../database/models');
const { Op } = require("sequelize");
const Users = db.User;
const Products = db.Product;
const Images = db.Product_images;

async function getHighlight() {
    try {
        // Postre del dia
        const maxQuant = await Products.max('quantity');
        const highlight = await Products.findOne({
            where: {
                quantity: maxQuant
            },
            include: [{ model: Images, as: 'product_images' }]
        });
        // Creando objeto limpio y con url de imagen
        const urlHighlight = highlight.product_images
            .filter(img => img.main)[0].url;

        return Object.assign(
            {},
            {
                id: highlight.id,
                name: highlight.name,
                price: parseFloat(highlight.price),
                discount: highlight.discount,
                image: urlHighlight
            }
        );
    } catch (error) {
        console.log(error);
        return null;
    }
}

const controller = {
    index: async (req, res) => {
        try {
            // Postre del dia
            const highlight = await getHighlight();

            // Postres destacados
            let recentProducts = await Products.findAll({
                where: {
                    quantity: { [Op.gt]: 0 }
                },
                order: [['updatedAt', 'DESC']],
                limit: 4,
                include: [{ model: Images, as: 'product_images' }]
            });


            // Limpiando obj y agregando URL de postres destacados
            recentProducts = recentProducts.map(product => {
                const urlProduct = product.product_images
                    .filter(img => img.main)[0].url;
                return Object.assign(
                    {},
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        discount: product.discount,
                        image: urlProduct
                    }
                );
            });
            const categories = await db.Category.findAll();

            return res.status(200).render("index", {
                highlight,
                recentProducts,
                categories
            });
        } catch (error) {
            console.log('Cannot read DB.', error)
            return res.status(500).render("error");
        }
    },
    login: (req, res) => {
        res.status(200).render("login");
    },
    signup: (req, res) => {
        res.status(200).render("signup");
    },
    wwr: (req, res) => {
        res.status(200).render("wwr");
    },
    profile: (req, res) => {

    },
    // POST DEL SIGNUP
    processSignup: async (req, res) => {

        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.status(401).render('signup', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }

        try {

            const userInDB = await Users.findOne({
                where: {
                    email: {
                        [Op.like]: req.body.email
                    }
                }
            });
            if (userInDB) {
                return res.render('signup', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
            }

            let hashedPass = bcryptjs.hashSync(req.body.password, 10);
            hashedPass = hashedPass.slice(7, hashedPass.length);

            const userToCreate = {
                ...req.body,
                password: hashedPass,
                avatar: req.body.avatar || "/images/avatars/default.jpg",
            }

            await Users.create(userToCreate);
            return res.status(201).redirect('/login');
        } catch (error) {
            console.log(error)
            return res.status(500).render("error");
        }
    },
    //Proceso Login
    processLogin: async (req, res) => {
        try {
            let userToLogin = await Users.findOne({
                where: {
                    email: {
                        [Op.like]: req.body.email
                    }
                }
            });
            userToLogin = userToLogin.dataValues;
            const rightPass = bcryptjs.compareSync(req.body.password,
                '$2a$10$' + userToLogin.password);
            if (rightPass) {
                // Session
                req.session.userId = userToLogin.id;

                // Cookie
                if (req.body.recordar) {
                    res.cookie('recordar', req.session.userId, {
                        maxAge: 1000 * 360 * 24 * 7 // una semana
                    });
                }

                await Users.update({ lastLogin: new Date() },
                    {
                        where: {
                            id: userToLogin.id
                        },
                        silent: true
                    });


                return res.redirect("users/" + req.session.userId);
            }


            // Si la contraseña es incorrecta
            return res.status(400).render("login", {
                errors: {
                    email: {
                        previous: req.body.email,
                        msg: 'El nombre de usuario y/o la contraseña que ingresaste no coinciden con nuestros registros.'
                    },
                },
            });

        } catch (error) {
            return res.status(400).render("login", {
                errors: {
                    email: {
                        previous: req.body.email,
                        msg: 'El nombre de usuario y/o la contraseña que ingresaste no coinciden con nuestros registros.'
                    }
                }
            });
        }
    },
    processLogout: (req, res) => {
        res.clearCookie('recordar');
        delete res.locals.sessionId;
        // delete req.session.userId;
        req.session.destroy();
        res.status(200).redirect('/');
    },

    searchProducts: async (req, res) => {

        let query = {
            where: {
                name: { [Op.like]: '%' + req.query.q + '%' },
                quantity: { [Op.gt]: 0 }
            },
            order: [['name', 'ASC']],
            include: [
                {
                    model: Images,
                    as: 'product_images'
                }, {
                    model: db.Product_category,
                    as: 'product_category',
                    where: { categoryId: req.query.cat },
                    include: [{
                        model: db.Category,
                        as: 'category',
                        attributes: ['name']
                    }],
                }
            ],
        };

        if (!req.query.q) {
            delete query.where.name;
        }
        if (!req.query.cat) {
            query.include.pop();
        }

        try {
            let searchResult = await Products.findAll(query);

            const categoryName = searchResult.length && searchResult[0].product_category ?
                searchResult[0].product_category[0].category.name : null;


            // Limpiando obj y agregando URL de postres destacados
            searchResult = searchResult.map((product) => {
                const urlProduct = product.product_images
                    .filter(img => img.main)[0].url;
                return Object.assign(
                    {},
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        discount: product.discount,
                        image: urlProduct
                    }
                );
            });

            const categories = await db.Category.findAll({ raw: true });

            if (searchResult.length === 0) {
                const highlight = await getHighlight();
                return res.status(200).render('search', { highlight, categories });
            }

            if (categoryName) {
                return res.status(200).render('search', {
                    searchResult,
                    categoryName,
                    categories
                });
            }

            return res.status(200).render('search', { searchResult, categories });
        } catch (error) {
            console.log(error);
            return res.status(500).render("error");
        }
    }

};

module.exports = controller;