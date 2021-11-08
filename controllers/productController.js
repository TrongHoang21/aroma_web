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
                attributes: ['id', 'name', 'imagepath', 'price']    //this alligns with models like codeCoTinhNHapSai
            })
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)));
    });
};

controller.getAll = () => {
    return new Promise((resolve, reject) => {
        Product
            .findAll({
                include: [{model: models.Category}],
                attributes: ['id', 'name', 'imagepath', 'price']
            })
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
                product.Reviews = reviews;
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