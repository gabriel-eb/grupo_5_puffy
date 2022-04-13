const db = require('../database/models');
const { Op } = require("sequelize");
const Users = db.User;

module.exports = async (req, res, next) => {
    if (req.cookies.recordar && req.user == undefined) {
        const user = await Users.findByPk(req.cookies.recordar);
        req.logIn(user.dataValues, (err) => {
            if (err) { return next(err); }
        });
    }
    next();
}