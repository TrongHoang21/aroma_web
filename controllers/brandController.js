const controller = {};
const models = require('../models');
const Brand = models.Brand;

controller.getAll = () => {
    return new Promise((resolve, reject) => {
        Brand
            .findAll({
                attributes: ['id', 'name', 'imagepath', 'summary']
                ,include: [{model : models.Product}] //foreign key
            })
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)));
    });
};

module.exports = controller;