const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const sequelize = require('sequelize');
const db = require('../database/models');
const { Op } = require("sequelize");
const Users = db.User;
const Products = db.Product;
const Images = db.Product_images;


const controller = {
    index: async (req, res) => {
        // Postre del dia
        const maxQuant = await Products.max('quantity');
        const highlight = await Products.findOne({ 
            where: { 
                quantity: maxQuant 
            },
            raw: true 
        });
        // Imagen del Postre del dia
        const highlightImg = await Images.findOne({
            where: {
                productId: highlight.id,
                main: 1
            }
        });
        highlight.image = highlightImg.url;


        // Postres destacados
        const recentProducts = await Products.findAll({
            where: {
                quantity: { [Op.gt]: 0 }
            },
            order: [['updatedAt', 'DESC']],
            limit: 4,
            raw: true
        });
        // Imagenes de postres destacados
        for (let product of recentProducts) {
            const prodImg = await Images.findOne({
                where: {
                    productId: product.id,
                    main: 1
                },
                raw: true
            });
            product.image = prodImg.url;
        }

        res.status(200).render("index", { highlight, recentProducts });
    },
    carrito: (req, res) => {
        res.status(200).render("carrito");
    },
    login: (req, res) => {
        res.status(200).render("login");
    },
    signup: (req, res) => {
        res.status(200).render("signup");
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
            
        const userInDB = await Users.findOne({ where: { email: { [Op.like]: req.body.email } } });
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
            return res.status(500).json({ error: error.message })
        }
    },
    //Proceso Login
    processLogin: async (req, res) => {
        try{
            let userToLogin = await Users.findOne({ where: { email: { [Op.like]: req.body.email } } });
            userToLogin = userToLogin.dataValues;
            if (bcryptjs.compareSync(req.body.password, '$2a$10$' + userToLogin.password)) {
                // Session
                req.session.userId = userToLogin.id;

                // Cookie
                if (req.body.recordar) {
                    res.cookie('recordar', req.session.userId, {
                        maxAge: 1000 * 360 * 24 * 7 // una semana
                    });
                }

                await Users.update({ lastLogin: new Date() }, { where: { id: userToLogin.id }, silent: true });


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
    }

};

module.exports = controller;