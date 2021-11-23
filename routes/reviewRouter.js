const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.isLoggedIn, (req, res, next) =>{
    const reviewController = require('../controllers/reviewController')
    let review = {
        userId: req.session.user.id,
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