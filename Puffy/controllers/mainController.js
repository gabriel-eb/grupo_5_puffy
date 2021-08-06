const model = require('../models/mainModel');
const userModel = require('../models/usersModel');
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
        model.signup();
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


};

module.exports = controller;