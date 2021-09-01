const modelo = require('../models/usersModel');
const db = require('../database/models');
const sequelize = db.sequelize;
const Users = db.User;


const controller = {
    obtenerPerfil: async (req, res) => {
        try {
            const user = await Users.findByPk(req.params.id);
            return res.render('users/profile', { user: user.dataValues });
        } catch (error) {
            console.log(error);
            return res.status(401).json({error});
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
    modificar: async (req, res) => {
        try {
            await Users.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.redirect('/users/' + req.params.id);
        } catch (error) {
            console.log(error);
            res.status(403).json({ error })
        }
    },
    vistaNuevaDir: (req, res) => {
        //TODO: llenar select with api?
        res.status(200).render("users/address/addAddress")
    },
    agregarDir: (req, res) => {
        // TODO: mysql conn
        res.redirect('/users/' + req.params.id);
    },
    vistaDirecciones: (req, res) => {
        // TODO: mysql conn
        res.render('users/address/index', { addresses: '' });
    }
};


module.exports = controller;