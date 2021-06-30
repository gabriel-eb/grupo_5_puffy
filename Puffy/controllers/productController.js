const fs = require('fs');
let categorias = ["Keto", "Light", "Vegano", "Normal"];

let listadoPostres = [{
    id: 1,
    nombre: 'Pastel de chocolate',
    descripcion: 'Rico pastel de 3 tipos de chocolates, sin gluten.',
    img: 1,
    categoria: 'Light',
    tam: 1,
    precio: 99
}];

const controller = {
    index: (req, res) => {
        const archivoProductos = fs.readFileSync(__dirname+'/../DB/productos.json');
        
        const productos = JSON.parse(archivoProductos);
        res.status(200).render("products/index",{
            productos
        });
    },
    delete:(req,res) =>{
        const archivoProductos = fs.readFileSync(__dirname+'/../DB/productos.json');
        let productos = JSON.parse(archivoProductos);

        productos = productos.filter(el=>{
            if(el.id!=req.params.id){
                return el
            }
        });

        fs.writeFileSync(__dirname+'/../DB/productos.json',JSON.stringify(productos));

        // res.status(200).render("products/index",{
        //     productos
        // });
        res.redirect('/productos');
    },
    detalle: (req, res) => {
        res.status(200).render("products/detalle");
    },
    agregar: (req, res) => {
        res.status(200).render("products/agregar", {
            categorias: categorias
        });
    },
    modificar: (req, res) => {
        let [postre] = listadoPostres.filter(el => el.id === parseInt(req.params.id));
        res.status(200).render("products/modificar", {
            postre: postre,
            categorias: categorias
        });
    },
};


module.exports = controller;
