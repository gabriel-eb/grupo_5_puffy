const userModel = require('../models/usersModel');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const { Op } = require("sequelize");
const Users = db.User;


const controller = {
    index: (req, res) => {
        res.status(200).render("index");
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

        let userInDB = await Users.findOne({ where: { email: { [Op.like]: req.body.email } } });
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

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file ? req.file.filename : "default.jpg",
        }

        try {
            await Users.create(userToCreate);
            return res.status(201).redirect('/login');
        } catch (error) {
            return res.status(500).json({ error: error.message, lengthPass: userToCreate.password.length })
        }
    },
    //Proceso Login
    processLogin: (req, res) => {
        let userToLogin = userModel.findByField('email', req.body.email);
        if (userToLogin) {
            let checkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (checkPassword) {
                // Session
                req.session.userId = userToLogin.id;

                // Cookie
                if (req.body.recordar) {
                    res.cookie('recordar', req.session.userId, {
                        maxAge: 1000 * 360 * 24 * 7 // una semana
                    });
                }

                return res.redirect("users/" + req.session.userId);
            }
            return res.render("login", {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            });
        }
        return res.render("login", {
            errors: {
                email: {
                    msg: 'No se encuentra este email en nuestra base de datos'
                }
            }
        });
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