const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    const categoryController = require('../controllers/categoryController');
    categoryController
        .getAll()
        .then(data => {
            res.locals.categories = data;
            const productController = require('../controllers/productController');
            return productController.getTrendingProducts();
        })
        .then(data => {
            res.locals.trendingProducts = data;
            res.render('index1');
        })
        .catch(error => next(error));   //next: trong truoong hop co loi thi quang ra ben ngoai de xu li

});


module.exports = router;