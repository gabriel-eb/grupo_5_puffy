module.exports = (req, res, next) => {
    if (req.user.admin===1) {
        next();
    } else {
        res.status(403).redirect('/');
    }
}