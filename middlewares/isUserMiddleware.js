module.exports = (req, res, next) => {
    if (req.session.userId == req.params.id) {
        next();
    } else {
        res.status(401).redirect('/login');
    }
}