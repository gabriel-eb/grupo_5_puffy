const modelo = require('../models/usersModel');

const controller = {
    obtenerPerfil: (req, res) => {
        const user = modelo.obtenerUser(parseInt(req.params.id));
        res.render('users/profile.ejs', { user })
    },
    vistaModificar: (req, res) => {
        res.status(200).render("users/editar");
    },
};


module.exports = controller;