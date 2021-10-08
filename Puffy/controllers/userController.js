const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { Op } = require("sequelize");
const Users = db.User;
const { processLogout } = require('./mainController');
const { validationResult } = require('express-validator');

module.exports = {
    obtenerPerfil: async (req, res) => {
        try {
            const user = await Users.findByPk(req.params.id);
            return res.render('users/profile', { user: user.dataValues });
        } catch (error) {
            console.log(error);
            return res.status(401).json({ error });
        }
    },
    vistaModificar: async (req, res) => {
        try {
            const user = await Users.findByPk(req.params.id);
            return res.status(200).render("users/editar", { user: user.dataValues });
        } catch (error) {
            console.log(error);
            return res.status(403).json({ error })
        }
    },
    vistaModificarPass:  (req, res) => {
        return res.status(200).render("users/editarPass");
    },
    modificar: async (req, res) => {
        try {

            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                const user = await Users.findByPk(req.params.id);
                user = user.dataValues;
                user = { ...user, ...req.body };
                return res.status(401).render('users/editar', {
                    errors: resultValidation.mapped(),
                    user: user.dataValues
                });
            }

            const userInDB = await Users.findOne({ where: { email: { [Op.like]: req.body.email } } });
            if (userInDB && userInDB.dataValues.email !== req.body.email) {
                const user = await Users.findByPk(req.params.id);
                return res.status(200).render('users/editar', {
                    errors: { email: { msg: 'Este email ya está registrado' } },
                    user: user.dataValues
                });
            }

            await Users.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            return res.redirect('/users/' + req.params.id);
        } catch (error) {
            console.log(error);
            return res.status(403).json({ error })
        }
    },
    modificarPass: async (req, res) => {
        try {
            const user = await Users.findByPk(req.params.id);

            const currentPass = user.password;

            if(bcryptjs.compareSync(req.body.password, '$2a$10$' + currentPass)){
                let hashedPass = bcryptjs.hashSync(req.body.newPass, 10);
                hashedPass = hashedPass.slice(7, hashedPass.length);
                await Users.update({ password: hashedPass}, {
                    where: {
                        id: user.id
                    }
                });
                return res.redirect('/users/' + req.params.id);
            }
            return res.render("users/editarPass", {
                errors: {
                    password: { msg: 'La contraseña es incorrecta.' }
                }
            })

        } catch (error) {
            console.log(error);
            return res.status(403).send(new Error());
        }
    },
    borrar: async (req, res) => {
        try {
            await Users.destroy({
                where: {
                    id: req.params.id
                }
            });
            return processLogout(req, res);
        } catch (error) {
            console.log(error);
            return res.status(403).json({ error })
        }
    }
};
