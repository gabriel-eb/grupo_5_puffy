const modelo = require('../models/productsModel');
const categorias = ["Keto", "Light", "Vegano", "Normal"];

//db
const db = require('../database/models');
const sequelize = db.sequelize;
const Products = db.Product;

const controller = {
    index: async (req, res) => {
       // const productos = modelo.obtenerProductos();

       try {
        const productsList = await Products.findAll();
        res.status(200).render("products/index", { productsList });
        
    } catch (error) {
        console.log(error);
    }
       
      //  res.status(200).render("products/index", { productos });
    },
    delete: (req, res) => {
        modelo.borrarProducto(parseInt(req.params.id));
        res.redirect('/productos');
    },
    vistaAgregar: (req, res) => {
        res.status(200).render("products/agregar", { categorias });
    },
    detalle: (req, res) => {
        const producto = modelo.obtenerProducto(parseInt(req.params.id));
        res.status(200).render("products/detalle", { producto });
    },
    vistaModificar: (req, res) => {
        const producto = modelo.obtenerProducto(parseInt(req.params.id));
        res.status(200).render("products/modificar", {
            producto,
            categorias
        });
    },
    agregar: (req, res) => {

        modelo.agregarProducto(req);
        res.redirect('/productos');
    },
    modificar: (req, res) => {
        modelo.modificarProducto(req);
        res.redirect('/productos');
    },
};


module.exports = controller;