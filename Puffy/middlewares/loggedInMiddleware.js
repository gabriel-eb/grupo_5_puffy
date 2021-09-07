module.exports = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect(`/users/${req.session.userId}`);
    }
    next();
}