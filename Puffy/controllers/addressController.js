const db = require('../database/models');
const Addresses = db.Address;
const estados = [
    'Aguascalientes', 'Baja California', 'Baja California Sur',
    'Campeche', 'Coahuila de Zaragoza', 'Colima', 'Chiapas',
    'Chihuahua', 'Ciudad de México', 'Durango', 'Guanajuato',
    'Guerrero', 'Hidalgo', 'Jalisco', 'Estado de México',
    'Michoacán de Ocampo', 'Morelos', 'Nayarit', 'Nuevo León',
    'Oaxaca de Juárez', 'Puebla', 'Querétaro', 'Quintana Roo',
    'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco',
    'Tamaulipas', 'Tlaxcala', 'Veracruz de Ignacio de la Llave',
    'Yucatán', 'Zacatecas'
]

module.exports = {
    vistaDirecciones: async (req, res) => {
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
    vistaNuevaDir: async (req, res) => {
        //TODO: llenar select with api?
        return res.status(200).render("users/addresses/addAddress", { estados });
    },
    agregarDir: async (req, res) => {
        try {
            req.body.userId = req.params.id;
            await Addresses.create(req.body);
            return res.redirect(`/users/${req.params.id}/addresses`);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },
    vistaModificarDir: async (req, res) => {
        try {
            const address = await Addresses.findByPk(req.params.idAddress);
            return res.status(200)
                .render('users/addresses/editAddress', { address: address.dataValues, estados });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },
    modificarDir: async (req, res) => {
        try {
            await Addresses.update(req.body, {
                where: {
                    id: req.params.idAddress
                }
            })
            return res.redirect(`/users/${req.params.id}/addresses`);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },
    borrarDir: async (req, res) => {
        try {
            await Addresses.destroy({
                where: {
                    id: req.params.idAddress
                }
            })
            return res.redirect(`/users/${req.params.id}/addresses`);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }
}