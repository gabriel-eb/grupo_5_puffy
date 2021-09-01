const db = require('../database/models');
const Users = db.User;


module.exports = {
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
            return res.redirect('/users/' + req.params.id);
        } catch (error) {
            console.log(error);
            return res.status(403).json({ error })
        }
    },
};
