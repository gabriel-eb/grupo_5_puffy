// Paquetes
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const morgan = require("morgan");
const session = require("express-session");
let RedisStore = require('connect-redis')(session);
const redis = require('redis');
const cookieParser = require('cookie-parser');
const sequelize = require('sequelize');
const passport = require('passport');
const initPassport = require('./controllers/passportController');
initPassport(passport);

/**
 * TODO:
 * - implement redis for all products, categories, and highlight product
 * - implement mailer & form for reseting password
 * - implement cron job to clear invited tables in db
 * - create images for express, react, db, and reddis
 * - create k8s file with all images
 * - create image repo ecr? in aws 
 * - create eks fargate in aws with k8s from ecr
 **/

// Imports locales
const rutaMain = require("./routes/mainRoute");
const rutaProducts = require("./routes/productsRoute");
const rutaUsers = require("./routes/usersRoute");
const rutaCarts = require("./routes/cartsRoute");
const rutaApi = require("./routes/apiRoute");
const rutaInvited = require("./routes/invitedRoute");
const recordarSession = require('./middlewares/recordarSessionMiddleware');
const PORT = process.env.PORT || 3030;


// app.set("views", __dirname + '/carpetaViews');
app.set("view engine", "ejs");


// Settingup redis for session
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: 6279,
    password: process.env.REDIS_SEC || "pUff7",
    legacyMode:true
})
redisClient.on('error', err => console.log('Redis client Error', err));
(async () => await redisClient.connect())();


// Middlewares
// app.use(morgan(':method :url :status :response-time ms'));
app.use(morgan('dev', { skip: (req, res) => req.url.match('(jpg|png|ico|css|svg)$') }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser(process.env.COOKIE_SEC || "pUff7"));
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SEC || "pUff7",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Login MW
app.use(recordarSession);
app.use((req, res, next) => {
    res.locals.sessionId = 'user' in req ? req.user.id : false;
    res.locals.sessionIdAdmin = 'user' in req ? req.user.admin : false;
    next();
});


// Rutas
app.use("/", rutaMain);
app.use("/productos", rutaProducts);
app.use("/users", rutaUsers);
app.use("/cart", rutaCarts);
app.use("/api", rutaApi);
app.use("/invited", rutaInvited);

// Demo Error 500
app.get("/error", (req, res, next) => {
    let err = new Error('Not page found');
    err.message = 'Problema interno.'
    err.status = 500;
    next(err);
});

/**
 *  REACT
 * Para usar react como una vista est??tica es necesario
 * descomentar las l??neas de acontinuaci??n,
 * posteriormente usar `npm install` dentro de '/dashboard',
 * usamos `npm run build` y ahora podemos correr esta app
 * con `node app` o `npm run dev`
 */
// const notLogged = require("./middlewares/notLoggedMiddleware");
// const isAdmin = require('./middlewares/isAdminMiddleware');
// // Ruta a Dashboard en React
// app.use(express.static(path.join(__dirname, '/dashboard/build')));
// app.get("/dashboard", notLogged, isAdmin, (req, res) => {
//     res.sendFile(path.join(__dirname + '/dashboard/build/index.html'));
// });

// ************ error handler ************
// Handle 400
app.use((req, res) => {
    let error = new Error('Not page found');
    error.message = 'P??gina no encotrada.'
    error.status = 404;
    res.status(404).render('error400', { error });
});
// Handle 500
app.use(function (error, req, res, next) {
    console.log(error);
    error.message = 'Error del servidor. Vuelva a intendar m??s tarde.'
    res.status(500 || error.status).render('error500', { error });
});


app.listen(PORT, () => {
    console.log("Escuchando en http://localhost:" + PORT + "/");
});