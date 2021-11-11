const controller = {};
const models = require('../models');
const Category = models.Category;
const Sequelize = require('sequelize');
const Opr = Sequelize.Op;

// controller.getAll = () => {
//     return new Promise((resolve, reject) => {
//         Category
//             .findAll({
//                 attributes: ['id', 'name', 'imagepath', 'summary']
//                 ,include: [{model : models.Product}] //foreign key //this will add an extra column of data into the object returned, plural cause it hasMany -> Products
//             })
//             .then(data => resolve(data))
//             .catch(error => reject(new Error(error)));
//     });
// };

controller.getAll = (query) => {
    return new Promise((resolve, reject) => {
        let options = {
            attributes: ['id', 'name', 'imagepath', 'summary']
            ,include: [{
                model : models.Product,
                where: {}
            }] //foreign key //this will add an extra column of data into the object returned, plural cause it hasMany -> Products
        }

        //THIS IS FOR SEARCHING FUNCTION
        if(query && query.search != ''){
            options.include[0].where.name = {
                [Opr.iLike]: `%${query.search}%`
            }
        }

        Category
            .findAll(options)
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)));
    });
};



module.exports = controller;