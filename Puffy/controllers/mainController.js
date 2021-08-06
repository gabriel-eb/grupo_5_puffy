const { validationResult } = require('express-validator');
const user = require('../models/users');
const bcryptjs = require('bcryptjs');

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

        let userInDB = user.findByField('email', req.body.email);

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
            // if(filename=!''){
            avatar: req.file.filename || "default.jpg",
            // }
            
        
        }

        user.create(userToCreate);

        res.redirect('/login');

    },

    //Proceso Login

    processLogin: (req, res) => {
        let userToLogin = user.findByField('email', req.body.email);

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


};

module.exports = controller;