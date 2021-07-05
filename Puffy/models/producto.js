const { join } = require("path");
const { writeFileSync } = require('fs');
const pathProductos = join(__dirname, '../DB/productos.json');

function leerProductos(){
    return require(pathProductos);
}

function actualizarProductos(productos){
    writeFileSync(pathProductos, JSON.stringify(productos, null, 4));
}

function obtenerProductos(){
    return leerProductos();
}

function obtenerProducto(id){
    return leerProductos().find(prod => prod.id === id);
}

function borrarProducto(id){
    let productos = leerProductos();
    productos = productos.filter(el=>{
        if(el.id!=req.params.id){
            return el
        }
    });
    actualizarProductos(productos);
}

// Funcion agregar

// Funcion modificar

module.exports = { obtenerProductos, obtenerProducto, borrarProducto };