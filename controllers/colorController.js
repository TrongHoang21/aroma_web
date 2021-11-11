const controller = {};
const { query } = require('express');
const models = require('../models');
const Color = models.Color;
const Sequelize = require('sequelize');
const Opr = Sequelize.Op;

controller.getAll = (query) => {
    return new Promise((resolve, reject) => {
        let options = {
            attributes: ['id', 'name', 'imagepath', 'code']
            ,include: [{
                model : models.ProductColor,
                include: [{
                    model: models.Product,
                    attributes: [],
                    where: {
                        price:{
                            [Opr.gte]: query.min,
                            [Opr.lte]: query.max
                        }
                    }
                }]
            }] //foreign key
        };

        if(query.category > 0) {    //exists
            options.include[0].include[0].where.categoryId = query.category;
        }

        //THIS IS FOR SEARCHING FUNCTION
        if(query.search != ''){
            options.include[0].include[0].where.name = {
                [Opr.iLike]: `%${query.search}%`
            }
        }
        
        if(query.brand > 0) {
            options.include[0].include[0].where.brandId = query.brand;

        }



        Color
            .findAll(options)
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)));
    });
};

module.exports = controller;