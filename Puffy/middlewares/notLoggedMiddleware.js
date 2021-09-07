module.exports = (req, res, next) => {
    if (req.session.userId) {
        next();
    }
    res.redirect('/login');
}