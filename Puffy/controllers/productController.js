const modelo = require('../models/producto');
let categorias = ["Keto", "Light", "Vegano", "Normal"];

const controller = {
    index: (req, res) => {
        const productos = modelo.obtenerProductos();
        res.status(200).render("products/index",{ productos });
    },
    delete:(req,res) =>{
        modelo.borrarProducto(parseInt(req.params.id));
        res.redirect('/productos');
    },
    detalle: (req, res) => {
        const producto = modelo.obtenerProducto(parseInt(req.params.id));
        res.status(200).render("products/detalle", { producto });
    },
    vistaAgregar: (req, res) => {
        res.status(200).render("products/agregar", {
            categorias: categorias
        });
    },
    vistaModificar: (req, res) => {
        const postre = modelo.obtenerProducto(parseInt(req.params.id));
        res.status(200).render("products/modificar", {
            postre,
            categorias
        });
    },
    agregar: null,
    modificar: null,
};


module.exports = controller;
