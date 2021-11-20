const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

    //CHECK SYNTAX BLOCK
    if((req.query.category == null) || isNaN(req.query.category)){
        req.query.category = 0;
    }
    if((req.query.brand == null) || isNaN(req.query.brand)){
        req.query.brand = 0;
    }
    if((req.query.color == null) || isNaN(req.query.color)){
        req.query.color = 0;
    }
    if((req.query.min == null) || isNaN(req.query.min)){
        req.query.min = 0;
    }
    if((req.query.max == null) || isNaN(req.query.max)){
        req.query.max = 100;
    }

    if((req.query.sort == null)){
        req.query.sort = 'name';
    }
    if((req.query.limit == null) || isNaN(req.query.limit)){
        req.query.limit = 9;
    }
    if((req.query.page == null) || isNaN(req.query.page)){
        req.query.page = 1;
    }
    if((req.query.search == null) || (req.query.search.trim() == '')){
        req.query.search = '';
    }

    const categoryController = require('../controllers/categoryController');
    categoryController
        .getAll(req.query)
        .then(data => {
            res.locals.categories = data;
            const brandController = require('../controllers/brandController');
            return brandController.getAll(req.query);
        })
        .then(data => {
            res.locals.brands = data;
            const colorController = require('../controllers/colorController');
            return colorController.getAll(req.query);
            
        })
        .then(data => {
            res.locals.colors = data;
            const productController = require('../controllers/productController');
            return productController.getAll(req.query);
        })
        .then(data => {
            //OLD: res.locals.products = data;

            //THIS IS FOR PAGINATE
            res.locals.products = data.rows;
            res.locals.pagination = {
                page: parseInt(req.query.page),
                limit: parseInt(req.query.limit),
                totalRows: data.count
            };            
            res.render('category');
        })
        .catch(error => next(error));
    
});

router.get('/:id', (req, res) => {
    const productController = require('../controllers/productController');
    productController
        .getById(req.params.id)
        .then(product => {
            res.locals.product = product;

            //this added for reiview functionality
            let reviewController = require('../controllers/reviewController')
            return reviewController.getUserReviewProduct(1, req.params.id);
        })
        .then(review => {
            res.locals.userReview = review;
            res.render('single-product');
        })

});

module.exports = router;