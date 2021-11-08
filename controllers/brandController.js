const controller = {};
const { query } = require('express');
const models = require('../models');
const Brand = models.Brand;

controller.getAll = (query) => {
    return new Promise((resolve, reject) => {
        let options = {
            attributes: ['id', 'name', 'imagepath', 'summary']
            ,include: [{
                model : models.Product,
                attributes: ['id'], //id product
                where: {}       //attr catId in product, so 'where' have to be in this scope
            }] //foreign key
        };

        if(query.category){
            options.include[0].where.categoryId = query.category; //this is an array so have to include[0]
        }

        //color filter inside brand
        if(query.color){    //if exists
            options.include[0].include = [{ //include because db color donot connect directly to brand
                model: models.ProductColor,
                attributes: [],
                where: {colorId: query.color}
            }];

            //console.log(options.include[0].include)
        }
        Brand
            .findAll(options)
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)));
    });
};

module.exports = controller;