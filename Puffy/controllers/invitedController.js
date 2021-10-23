const db = require('../database/models');
const Invited = db.Invited;
const Addresses = db.InvitedAddress;

module.exports = {
    index: async (req, res) => {
        try {
            return res.status(200).json(await Invited.findAll());
        } catch (err) {
            console.error(err);
        }
    },
    createInvited: async (req, res) => {
        try {
            const newInvited = {
                name: req.body.name,
                mobile: req.body.mobile,
                email: req.body.email
            };
            const invitedCreated = await Invited.create(newInvited);
            const newAddress = {
                line1: req.body.line1,
                line2: req.body.line2,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                zip: req.body.zip,
                invitedId: invitedCreated.id
            }
            await Addresses.create(newAddress);
            return res.status(201).redirect('/');
            // return res.status(201).json(1);
        } catch (err) {
            console.error(err);
            return res.status(500);
        }
    },
    deleteInvited: async (req, res) => {
        try {
            await Invited.destroy({ where: { id: req.params.invitedId } });
            return res.status(204);
        } catch (err) {
            console.error(err);
            return res.status(500);
        }
    }
}