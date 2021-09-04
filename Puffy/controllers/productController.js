const modelo = require('../models/productsModel');
//const categorias = ["Keto", "Light", "Vegano", "Normal"];

//db
const db = require('../database/models');
const sequelize = db.sequelize;
const Products = db.Product;
const Categories = db.Category;
const ProductCat = db.Product_category;
const Images = db.Product_images;

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
    delete: async (req, res) => {
        //  modelo.borrarProducto(parseInt(req.params.id));

        /*MODEL*/
        // function borrarProducto(id) {
        //     let productos = leerProductos();
        //     productos = productos.filter(el => el.id !== id);
        //     actualizarProductos(productos);
        // }

        try {
            await Products.destroy({
                where: {
                    id: req.params.id
                }
            })
            return res.redirect('/productos');
        } catch (error) {
            console.log(error);
        }

        // res.redirect('/productos');
    },
    vistaAgregar: async (req, res) => {
        try {
            const categoriesList = await Categories.findAll();
            const categories = [];
            categoriesList.map(cat => categories.push(cat.dataValues));
            res.status(200).render("products/agregar", { categories });

        } catch (error) {
            console.log(error);
        }

        // res.status(200).render("products/agregar", { categorias });
    },
    detalle: async (req, res) => {
        // const producto = modelo.obtenerProducto(parseInt(req.params.id));


        /*MODEL*/
        //         function obtenerProducto(id) {
        //     return leerProductos().find(prod => prod.id === id);
        // }

        try {
            const productDetail = await Products.findOne({
                where: {
                    id: req.params.id
                }
            });

            const categoriesList = await Categories.findAll();
            res.status(200).render("products/detalle", { productDetail, categoriesList});

        } catch (error) {
            console.log(error);
        }


        //  res.status(200).render("products/detalle", { producto });
    },
    vistaModificar: async (req, res) => {
        /* const producto = modelo.obtenerProducto(parseInt(req.params.id));
         res.status(200).render("products/modificar", {
             producto,
             categorias
         });

 */

         //MODEL
        //  function obtenerProducto(id) {
        //     return leerProductos().find(prod => prod.id === id);
        // }



        try {
            const producto = await Products.findByPk(req.params.id);
            const category= await productCat.findOne({
                where: {
                    productId: req.params.id
                }
            });
            return res.status().render("products/modificar", {
                producto,
                category
            });
        } catch (error) {
            console.log(error);
        }
    }

    ,
    agregar: async (req, res) => {
        try {
            console.log(req.body)
            const addedProduct = await Products.create(req.body);

            const product_cat = {
                productId: addedProduct.dataValues.id,
                categoryId: req.body.category
            }
            await ProductCat.create(product_cat);

            const productImage = {
                url: req.body.image || "/images/avatars/default.jpg",
                main: true,
                productId: addedProduct.dataValues.id
            }
            await Images.create(productImage);

            return res.redirect('/productos');
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }



       // res.redirect('/productos');
    },


    modificar: async (req, res) => {
      //  modelo.modificarProducto(req);

        /*  MODEL
        
        function modificarProducto(req) {
                   const products = leerProductos()
                   const productIndex = products.findIndex(product => product.id === parseInt(req.params.id));
                   let newProduct = req.body;
                   newProduct.precio = parseFloat(newProduct.precio);
                   newProduct.tam = parseInt(newProduct.tam);
                   newProduct.categoria = parseInt(newProduct.categoria);
               
                   if (req.body.image) {
                       products[productIndex] = {
                           ...products[productIndex],
                           ...newProduct
                       }
               
                   } else {
                       products[productIndex] = {
                           id: products[productIndex].id,
                           nombre: newProduct.nombre,
                           descripcion: newProduct.descripcion,
                           precio: newProduct.precio,
                           tam: newProduct.tam,
                           categoria: newProduct.categoria,
                           imagen: products[productIndex].imagen
                       }
               
               
                   }
                   actualizarProductos(products);
               
               }
       */

               try {
                await Products.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                })
                return res.redirect('/productos');
            } catch (error) {
                console.log(error);
            }
       // res.redirect('/productos');
    },
};


module.exports = controller;