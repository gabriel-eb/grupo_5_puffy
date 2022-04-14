const LocalStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { Op } = require("sequelize");
const Users = db.User;

module.exports = (passport) => {

    const authUser = async (email, password, done) => {
        try {
            const userToLogin = await Users.findOne({
                where: {
                    email: {
                        [Op.like]: email
                    }
                },
                raw: true
            });

            if(!userToLogin){
                return done(null, false, { errors: { email: {
                    previous: email,
                    msg: 'Email o contraseña incorrectos.'
                }}});
            }

            const rightPass = bcryptjs.compareSync(password,
                '$2a$10$' + userToLogin.password);
            if (rightPass) {

                await Users.update({ lastLogin: new Date() },
                {
                    where: {
                        id: userToLogin.id
                    },
                    silent: true
                });


                return done(null, userToLogin);
            }

            return done(null, false, { message :  'Email o contraseña incorrectos.' });

        } catch (err) {
            return done(err);
        }
    }

    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, authUser));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });
    passport.deserializeUser(async (id, done) => {
        try{
            let user = await Users.findByPk(id);
            done(null, user);
        } catch(err){
            done(err);
        }
    });
}
