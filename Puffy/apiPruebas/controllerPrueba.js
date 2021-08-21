const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Address = require('../database/models/Address');
const User = require('../database/models/User');
const Users = db.User;
const Addresses = db.Address;
const Orders = db.Order;

module.exports = {
    listUsers: async (req, res) => {
        return res.status(200).json(await Users.findAll());
    },
    getUser: async (req, res) => {
        return res.status(200).json(await Users.findByPk(req.params.id));
    },
    addUser: async (req, res) => {
        const userCreated = await Users.create(req.body);
        return res.status(201).json({id: userCreated.id});
    },
    editUser: async (req, res)  => {
        await Users.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return res.status(201).json({msg: "Succesful changes!"});
    },
    deleteUser: async (req, res)  => {
        await Users.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200)
            .json({msg: `User with id ${req.params.id} removed.`});
    },


    listAddresses: async (req, res) => {
        return res.status(200).json(await Addresses.findAll());
    },
    getAddress: async (req, res) => {
        return res.status(200).json(await Addresses.findByPk(req.params.id));
    },
    addAddress: async (req, res) => {
        const addressCreated = await Addresses.create(req.body);
        return res.status(201).json({id: addressCreated.id});
    },
    editAddress: async (req, res)  => {
        await Addresses.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return res.status(201).json({msg: "Succesful changes!"});
    },
    deleteAddress: async (req, res)  => {
        await Addresses.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200)
            .json({msg: `Address with id ${req.params.id} removed.`});
    },


    listOrders: async (req, res) => {
        return res.status(200).json(await Orders.findAll());
    },
    getOrder: async (req, res) => {
        return res.status(200).json(await Orders.findByPk(req.params.id));
    },
    addOrder: async (req, res) => {
        const orderCreated = await Orders.create(req.body);
        return res.status(201).json({id: orderCreated.id});
    },
    editOrder: async (req, res)  => {
        await Orders.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return res.status(201).json({msg: "Succesful changes!"});
    },
    deleteOrder: async (req, res)  => {
        await Orders.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200)
            .json({msg: `Order with id ${req.params.id} removed.`});
    },


    listAllOrderInfo: async (req, res) => {
        const orderDetail = await Orders.findByPk(req.params.id, {
            include: ['address','user']
        });
        return res.status(200).json(orderDetail);
    }
}