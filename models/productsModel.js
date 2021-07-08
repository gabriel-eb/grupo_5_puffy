const { join } = require("path");
const { writeFileSync } = require('fs');
const pathProductos = join(__dirname, '../DB/productos.json');

function leerProductos() {
    return require(pathProductos);
}

function actualizarProductos(productos) {
    writeFileSync(pathProductos, JSON.stringify(productos, null, 4));
}

function obtenerProductos() {
    return leerProductos();
}

function obtenerProducto(id) {
    return leerProductos().find(prod => prod.id === id);
}

function borrarProducto(id) {
    let productos = leerProductos();
    productos = productos.filter(el => el.id !== id);
    actualizarProductos(productos);
}

function agregarProducto(req) {
    let products = leerProductos();
    const newId = products[products.length - 1].id + 1;
    products.push({
        id: newId,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen || "default.jpg",
        precio: parseFloat(req.body.precio),
        tam: parseInt(req.body.tam),
        categoria: parseInt(req.body.categoria)
    });


    actualizarProductos(products);


}

// Funcion modificar
function modificarProducto(req) {
    const products = leerProductos()
    const productIndex = products.findIndex(product => product.id === parseInt(req.params.id));

    if (req.body.image) {
        products[productIndex] = {
            ...products[productIndex],
            ...req.body
        }

    } else {
        products[productIndex] = {
            id: products[productIndex].id,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: parseFloat(req.body.precio),
            tam: parseInt(req.body.tam),
            categoria: parseInt(req.body.categoria),
            imagen: products[productIndex].imagen
        }


    }
    actualizarProductos(products);

}


module.exports = {
    obtenerProductos,
    obtenerProducto,
    borrarProducto,
    agregarProducto,
    modificarProducto
};