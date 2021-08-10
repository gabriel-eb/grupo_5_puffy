const userModel = require('../models/usersModel');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');


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
    processSignup: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('signup', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }
        let userInDB = userModel.findByField('email', req.body.email);
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
            avatar: req.file.filename || "default.jpg",
        }

        userModel.create(userToCreate);
        res.redirect('/login');
    },
    //Proceso Login
    processLogin: (req, res) => {
        let userToLogin = userModel.findByField('email', req.body.email);
        if (userToLogin) {
            let checkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (checkPassword) {
                req.session.userId = userToLogin.id;
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
        // req.session.id = null;
        delete res.locals.sessionId;
        delete req.session.userId;
        res.status(200).redirect('/');
    }

};

module.exports = controller;