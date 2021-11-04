const controller = {};
const models = require('../models');
const Product = models.Product;

controller.getTrendingProducts = () => {
    return new Promise((resolve, reject) => {
        Product
            .findAll({
                order:[
                    ['overallReview', 'DESC']   ///descendant giam dan
                ],
                limit: 8,
                include: [{model: models.Category}],
                attributes: ['id', 'name', 'imagepath', 'price']
            })
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)));
    });
};

module.exports = controller;