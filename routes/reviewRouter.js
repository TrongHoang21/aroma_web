const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) =>{
    const reviewController = require('../controllers/reviewController')
    let review = {
        userId: 1,
        productId: req.body.productId,
        message: req.body.message,
        rating: req.body.rating
    };

    reviewController
        .add(review)
        .then(() => {
            res.redirect('/products/' + review.productId);
        })
        .catch(error => next(error));
});

module.exports = router;