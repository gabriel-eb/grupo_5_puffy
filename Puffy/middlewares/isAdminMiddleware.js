module.exports = (req, res, next) => {
    if (req.session.isAdmin) {
        next();
    } else {
        res.status(403).redirect('/');
    }
}