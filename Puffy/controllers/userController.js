const modelo = require('../models/usersModel');


const controller = {
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
        // res.render('users/profile.ejs', { user })
        res.redirect('/');
    }
};


module.exports = controller;