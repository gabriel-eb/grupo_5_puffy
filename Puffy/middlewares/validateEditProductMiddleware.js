const { check } = require('express-validator');

module.exports = [
    check('name').isLength({ min: 2 })
        .withMessage('El nombre tiene que ser más largo.'),
    check('category').isNumeric()
        .withMessage('No elegiste la categoria del producto.'),
    check('size').notEmpty().isNumeric()
        .withMessage('No agregaste el tamaño del producto.'),
    check('quantity').notEmpty().isNumeric()
        .withMessage('No sagregaste la cantidad de producto.'),
    check('price').notEmpty().isFloat()
        .withMessage('No agregaste el precio del producto.')
]
