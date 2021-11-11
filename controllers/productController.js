const controller = {};
const models = require('../models');
const Product = models.Product;
const Sequelize = require('sequelize');
const Opr = Sequelize.Op;

controller.getTrendingProducts = () => {
    return new Promise((resolve, reject) => {
        Product
            .findAll({
                order:[
                    ['overallReview', 'DESC']   ///descendant giam dan
                ],
                limit: 8,
                include: [{model: models.Category}],    
                attributes: ['id', 'name', 'imagepath', 'price']    //this alligns with models like codeCoTinhNHapSai
            })
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)));
    });
};

controller.getAll = (query) => {
    return new Promise((resolve, reject) => {
        let options = {
            include: [{model: models.Category}],
            attributes: ['id', 'name', 'imagepath', 'price'],
            where: {
                price:{
                    [Opr.gte]: query.min,
                    [Opr.lte]: query.max
                }
            } //default
        };

        if(query.category > 0){
            options.where.categoryId = query.category;
        }

        //THIS IS FOR SEARCHING FUNCTION
        if(query.search != ''){
            options.where.name = {
                [Opr.iLike]: `%${query.search}%`
            }
        }

        if(query.brand > 0){
            options.where.brandId = query.brand;
        }

        if(query.color > 0){
            options.include = [{
                model: models.ProductColor,
                attributes: [],
                where: {colorId: query.color}   //START CODING HERE (IN FILTER FUNCTION)
            }]
        }

        //THIS IS FOR PAGING
        if(query.limit > 0){
            options.limit = query.limit;
            options.offset = query.limit * (query.page -1);
        }

        //THIS IS FOR SORTING
        if(query.sort){
            switch(query.sort){
                case 'name':
                    options.order = [
                        ['name', 'ASC']
                    ];
                    break;
                case 'price':
                    options.order = [
                        ['price', 'ASC'] 
                    ];
                    break;
                case 'overallReview':
                    options.order = [
                        ['overallReview', 'DESC'] 
                    ];
                    break;
                default:
                    options.order = [
                        ['name', 'ASC']
                    ];
            }
        }

        Product
            .findAll(options)
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)));
    });
};

controller.getById = (id) => {
    return new Promise((resolve, reject) => {
        let product;
        Product
            .findOne({
                include: [{model: models.Category}],    //cho nay nguoc thu tu voi  where trong huong dan
                where: {id: id}
            })
            .then(result => {
                product = result;

                return models.ProductSpecification.findAll({
                    where: {productId : id},
                    include: [{model: models.Specification}]    
                });
            })
            .then(productSpecifications123 => {
                product.ProductSpecifications = productSpecifications123;
                
                return models.Comment.findAll({
                    where: {productId: id, parentCommentId: null},
                    include: [{model: models.User},
                    {
                        model: models.Comment,
                        as: 'SubComments',
                        include: [{model: models.User}]

                    }]                    
                });
            })
            .then(comments => {
                product.Comments = comments;    
                
                return models.Review.findAll({
                    where: {productId: id},
                    include: [{model: models.User}]
                });
            })
            .then(reviews => {
                product.Reviews = reviews;  //this has attribute 'rating' for each user

                //for starList
                let stars = [];
                for(let i = 1; i <= 5; i++){
                    stars.push(reviews.filter(item => (item.rating == i)).length);
                }
                product.stars = stars;

                resolve(product);
            })          
            .catch(error => reject(new Error(error)));
    });
};

module.exports = controller;