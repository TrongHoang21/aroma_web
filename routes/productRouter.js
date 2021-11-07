const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    const categoryController = require('../controllers/categoryController');
    categoryController
        .getAll()
        .then(data => {
            res.locals.categories = data;
            const brandController = require('../controllers/brandController');
            return brandController.getAll();
        })
        .then(data => {
            res.locals.brands = data;
            const colorController = require('../controllers/colorController');
            return colorController.getAll();
            
        })
        .then(data => {
            res.locals.colors = data;
            const productController = require('../controllers/productController');
            return productController.getAll();


        })
        .then(data => {
            console.log('haha');
            console.log(data);
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