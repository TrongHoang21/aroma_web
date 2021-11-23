const controller = {};
const models = require('../models');
const User = models.User;
const bcrypjs = require('bcryptjs');

//get username, cause this project username is email
controller.getUserByEmail = (email) => {
    return User.findOne({
        where: {username: email}
    });
};

controller.createUser = (user) => {
    var salt = bcrypjs.genSaltSync(10);
    user.password = bcrypjs.hashSync(user.password, salt);
    return User.create(user);
}

controller.comparePassword = (password, hash) => {
    return bcrypjs.compareSync(password, hash);
};

controller.isLoggedIn = (req, res, next) => {
    if(req.session.user){
        next();
    }
    else {
        res.redirect(`/users/login?returnURL=${req.originalUrl}`);
    }
}

module.exports = controller;
