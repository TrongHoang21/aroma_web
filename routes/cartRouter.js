const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
   var cart = req.session.cart;
   res.locals.cart = cart.getCart();
   res.render('cart');

});

//when u hit the add-to-cart button
router.post('/', (req, res, next) => {
    var productId = req.body.id;
    var quantity = isNaN(req.body.quantity) ? 1 : req.body.quantity;
    var productCOntroller = require('../controllers/productController');
    productCOntroller
    .getById(productId)
    .then(product => {
        var cartItem = req.session.cart.add(product, productId, quantity);
        res.json(cartItem);
    })
    .catch(error => next(error));
});

//update the cart site
router.put('/', (req, res) => {
    var productId = req.body.id;
    var quantity = parseInt(req.body.quantity);
    var cartItem = req.session.cart.update(productId, quantity);

    res.json({
        cartItem: cartItem,
        totalQuantity: req.session.cart.totalQuantity,
        totalPrice: req.session.cart.totalPrice
    });
});

router.delete('/', (req, res) => {
    var productId = req.body.id;
    req.session.cart.remove(productId);
    res.json({
        totalQuantity: req.session.cart.totalQuantity,
        totalPrice: req.session.cart.totalPrice
    });
});

router.delete('/all', (req, res) => {
    
    req.session.cart.empty();
    res.sendStatus(204);    //HTTP 204 No Content
    res.end();  //writing more now is not allowed


});

module.exports = router;