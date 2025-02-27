const userLogin = (req, res, next) => {
    if (req.session && req.session.userLogin) {
        res.locals.userLogin = req.session.userLogin;

    } else {
        res.locals.userLogin = null;
    }
    next();
};

module.exports = userLogin;