const modelo = require('../models/usersModel');
const db = require('../database/models');
const sequelize = db.sequelize;
const Users = db.User;


const controller = {
    // Prueba sequlize 1
    list: async (req, res) => {
        const usersList = await Users.findAll();
        res.render('users/userList', { usersList });
    },
    // Prueba sequlize 2
    createUser: async function (req, res) {
        await db.User.create(req.body);
        const usersList = await Users.findAll();
        res.json(usersList);
    },
    obtenerPerfil: (req, res) => {
        const user = modelo.findByPK(parseInt(req.params.id));
        res.render('users/profile.ejs', { user })
    },
    vistaModificar: (req, res) => {
        const user = modelo.findByPK(parseInt(req.params.id));
        res.status(200).render("users/editar", { user });
    },
    modificar: (req, res) => {
       
        modelo.edit(req);
        res.redirect('/users/'+req.params.id);
    }
};


module.exports = controller;