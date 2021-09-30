const db = require('../../database/models');
const Products = db.Products;

module.exports = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Products.findAll({ raw: true });
            const apiResponse = Object.assign(
                {},
                {
                    id: '1'
                }
            );

            console.log(products);
            return res.status(200).json({ apiResponse });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },
    getProduct: async (req, res) => {
        try {
            const product = await Products.findByPk(req.params.id, { raw: true });
            const apiResponse = Object.assign(
                {},
                {
                    id: '1'
                }
            );
            console.log(product)

            return res.status(200).json({ apiResponse });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },
}