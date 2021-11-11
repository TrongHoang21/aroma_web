const controller = {};
const { query } = require('express');
const models = require('../models');
const Brand = models.Brand;
const Sequelize = require('sequelize');
const Opr = Sequelize.Op;

controller.getAll = (query) => {
    return new Promise((resolve, reject) => {
        let options = {
            attributes: ['id', 'name', 'imagepath', 'summary']
            ,include: [{
                model : models.Product,
                attributes: ['id'], //id product
                where: {
                    price:{
                        [Opr.gte]: query.min,
                        [Opr.lte]: query.max
                    }
                }       //attr catId in product, so 'where' have to be in this scope
            }] //foreign key
        };

        //THIS IS FOR SEARCHING FUNCTION  
        if(query.search != ''){
            options.include[0].where.name = {
                [Opr.iLike]: `%${query.search}%`
            }
        }

        if(query.category > 0){
            options.include[0].where.categoryId = query.category; //this is an array so have to include[0]
        }

        //color filter inside brand
        if(query.color > 0){    //if exists
            options.include[0].include = [{ //include because db color donot connect directly to brand
                model: models.ProductColor,
                attributes: [],
                where: {colorId: query.color}
            }];


            //Debug: console.log(options.include[0])
        }
        Brand
            .findAll(options)
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)));
    });
};

module.exports = controller;