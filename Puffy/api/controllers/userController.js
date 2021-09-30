const db = require('../../database/models');
const Users = db.User;


module.exports = {
    getAllProducts: async (req, res) => {
        try {
            const users = await Users.findAll({ raw: true });
            const apiResponse = Object.assign(
                {},
                {
                    id: '1'
                }
            );

            console.log(users);
            return res.status(200).json({ apiResponse });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },
    getProduct: async (req, res) => {
        try {
            const user = await Users.findByPk(req.params.id, { raw: true });
            const apiResponse = Object.assign(
                {},
                {
                    id: '1'
                }
            );

            console.log(user)
            return res.status(200).json({ apiResponse });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },
}