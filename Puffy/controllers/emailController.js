const nodemailer = require("nodemailer");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database/models");
const Users = db.User;

const uncrypToken = (token) => {
  return jwt.verify(token, process.env.TK_SEC || "pUff7");
};

module.exports = {
  index: (req, res) => {
    return res.status(200).render("resetPass/email", { msg: "" });
  },
  resetPassForm: (req, res) => {
    const token = req.query.k;
    const { date } = uncrypToken(token);
    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() - 1);
    const validToken = new Date(date) >= limitDate;

    if (validToken) {
      return res
        .status(200)
        .render("resetPass/resetForm", { expired: false, token });
    }
    return res.status(403).render("resetPass/resetForm", { expired: true, token: null });
  },
  resetPass: async (req, res) => {
    try {
      const { token } = req.body;
      const { id } = uncrypToken(token);
      // Hash & change password
      let hashedPass = bcryptjs.hashSync(req.body.password, 10);
      hashedPass = hashedPass.slice(7, hashedPass.length);
      await Users.update({ password: hashedPass }, { where: { id: id } });

      return res.status(200).redirect("/login");
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  },
  sendEmail: async (req, res) => {
    try {
      // Verify if email exist in DB
      const { email } = req.body;
      const currentUser = await Users.findOne({ where: { email: email } });
      if (currentUser === null) {
        return res
          .status(404)
          .render("resetPass/email", { msg: "El correo no está registrado." });
      }

      const token = jwt.sign(
        { id: currentUser.id, email, date: new Date() },
        process.env.TK_SEC || "pUff7"
      );

      console.log(
        `${req.protocol}://${req.get("host")}/reset/password?k=${token}`
      );

      // config transporter
      const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
           ciphers:'SSLv3'
        },
        auth: {
          user: "gabo_espburg@hotmail.com",
          pass: process.env.EMAIL_PASS || "",
        },
      });

      // setup e-mail data, even with unicode symbols
      const mailOptions = {
        from: '"Puffy" <gabo_espburg@hotmail.com>',
        to: email,
        subject: "Reset your passwprd ",
        html: `<h1>Puffy - Restablecer contraseña</h1><br/><br/><p>Para restablecer la contraseña vaya a la siguiente página:</p><br/><br/><a href="${
          req.protocol
        }://${req.get("host")}/reset/password?k=${token}"><h3>${
          req.protocol
        }://${req.get(
          "host"
        )}/reset/password?k=${token}</h3></a><br/><br/><p>El URL solo es valido por 24 horas.</p>`,
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          throw err;
        }
        console.log("Message sent: " + info.response);
      });

      return res.status(200).render("resetPass/email", {
        msg: "En breve recibirá un mensaje en su correo con las instrucciones.",
        inputDisable: true,
      });
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  },
};
