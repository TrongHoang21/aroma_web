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
            const prodcutController = require('../controllers/productController');
            return prodcutController.getAll();
        })
        .then(data => {
            res.locals.products = data;
            res.render('category');
        })
        .catch(error => next(error));
    
});

router.get('/:id', (req, res) => {
    res.render('single-product');
});

module.exports = router;