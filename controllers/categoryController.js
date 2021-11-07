const controller = {};
const models = require('../models');
const Category = models.Category;

controller.getAll = () => {
    return new Promise((resolve, reject) => {
        Category
            .findAll({
                attributes: ['id', 'name', 'imagepath', 'summary']
                ,include: [{model : models.Product}] //foreign key //this will add an extra column of data into the object returned, plural cause it hasMany -> Products
            })
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)));
    });
};

module.exports = controller;