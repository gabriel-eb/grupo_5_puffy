const db = require('../database/models');
const Addresses = db.Address;
const { validationResult } = require('express-validator');


module.exports = {
    getAllProducts: async (req, res) => {
        try {
            const addresses = await Addresses.findAll({
                where: {
                    userId: req.params.id
                }
            });
            return res.render('users/addresses/index', { addresses });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },
    getProduct: async (req, res) => {
        try {
            const addresses = await Addresses.findAll({
                where: {
                    userId: req.params.id
                }
            });
            return res.render('users/addresses/index', { addresses });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },
}