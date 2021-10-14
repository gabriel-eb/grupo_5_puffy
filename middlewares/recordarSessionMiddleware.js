module.exports = (req, res, next) => {
    if (req.cookies.recordar && req.session.userId == undefined) {
        req.session.userId = parseInt(req.cookies.recordar);
        req.session.isAdmin = parseInt(req.cookies.isA);
    }
    next();
}