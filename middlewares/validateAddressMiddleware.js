const { check } = require('express-validator');

module.exports = [
    check('line1').isLength({ min: 10 })
        .withMessage('La dirección requiere de 10 carácteres mínimo.'),
    check('zip').notEmpty().isNumeric().isLength({ min: 5, max: 5 })
        .withMessage('El código postal es de 5 dígitos'),
    check('city').isLength({ min: 2 })
        .withMessage('El municipio/delegación requiere de 10 carácteres mínimo.'),
    check('state').notEmpty()
        .withMessage('No seleccionaste un estado.')
]
