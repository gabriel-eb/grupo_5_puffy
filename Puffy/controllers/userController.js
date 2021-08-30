const modelo = require('../models/usersModel');
const db = require('../database/models');
const sequelize = db.sequelize;
const Users = db.User;


const controller = {
    // Prueba sequlize 1
    list: async (req, res) => {
        try {
            const usersList = await Users.findAll();
            res.render('users/userList', { usersList });
            
        } catch (error) {
            console.log(error);
        }
    },
    // Prueba sequlize 2
    createUser: async function (req, res) {
        await db.User.create(req.body);
        const usersList = await Users.findAll();
        res.json(usersList);
    },
    obtenerPerfil: async (req, res) => {
        try {
            const user = await Users.findOne({ where: { id: req.params.id } });
            res.render('users/profile', { user: user.dataValues });
        } catch (error) {
            console.log(error);
            res.status(401).json({error})
        }
    },
    vistaModificar: (req, res) => {
        const user = modelo.findByPK(parseInt(req.params.id));
        res.status(200).render("users/editar", { user });
    },
    modificar: (req, res) => {
        modelo.edit(req);
        res.redirect('/users/'+req.params.id);
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