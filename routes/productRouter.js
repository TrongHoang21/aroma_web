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

    const categoryController = require('../controllers/categoryController');
    categoryController
        .getAll()
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
            res.locals.products = data;
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
            res.render('single-product');
        })

});

module.exports = router;