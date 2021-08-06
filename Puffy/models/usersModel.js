const { join } = require("path");
const { writeFileSync } = require('fs');
const pathUsers = join(__dirname, '../DB/users.json');

function getData() {
    return require(pathUsers);
}

function updateData(users) {
    writeFileSync(pathUsers, JSON.stringify(users, null, 4));
}

function findByPK(id) {
    return getData().find(user => user.id === id);
}

//Metodo que nos permite buscar al usuario por cualquier campo, en este caso por email
//field="email","telefono",etc text=Texto exacto, por ejemplo montse@gmail.com
function findByField(field, text) {
    return getData().find(oneUser => oneUser[field] === text);
}

function deleteByPK(id) {
    let users = getData();
    users = users.filter(user => user.id !== id);
    updateData(users);
}

function create(req) {
    let users = getData();
    const newId = users[users.length - 1].id + 1;
    users.push({
        id: newId,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        category: req.body.category,
        avatar: req.body.avatar || "default.jpg"
    });
    updateData(users);
}

// Funcion modificar
function edit(req) {
    const users = getData();
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    let newUser = req.body;

    if (req.body.avatar) {
        users[userIndex] = {
            ...users[userIndex],
            ...newUser
        }
    } else {
        users[userIndex] = {
            id: users[userIndex].id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            category: newUser.category,
            avatar: users[userIndex].avatar
        }
    }
    updateData(users);
}

module.exports = {
    getData,
    findByPK,
    findByField,
    deleteByPK,
    create,
    edit
};