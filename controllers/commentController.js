const controller = {};
const models = require('../models');
const Comment = models.Comment;
const Sequelize = require('sequelize');
const Opr = Sequelize.Op;

controller.add = (comment) => {
    return new Promise((resolve, reject) => {
        Comment
            .create(comment)    //into dbase
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)));
    });
};

module.exports = controller;