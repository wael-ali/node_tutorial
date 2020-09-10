const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/',  shopController.getIndex);
//
router.get('/products', shopController.getProducts);
router.get('/products/:productId', isAuth, shopController.getProduct);
router.get('/cart', isAuth, shopController.getCart);
router.post('/cart', isAuth, shopController.postCart);
// router.get('/checkout', isAuth, shopController.getCheckout);
router.get('/orders', isAuth, shopController.getOrders);
// router.post('/delete-cart-item', isAuth, shopController.postDeleteCartItem);
router.post('/create-order', isAuth, shopController.postOrder);

module.exports = router;