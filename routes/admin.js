const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/admin/add-product', isAuth, adminController.getAddProduct);
router.post('/product', isAuth, adminController.postAddProduct);
router.get('/admin/edit-product/:productId',isAuth,  adminController.getEditProduct);
router.post('/admin/edit-product', isAuth, adminController.postEditProduct);
router.post('/admin/delete-product/:productId', isAuth, adminController.postDeleteProduct);
router.get('/admin/products', isAuth, adminController.getProducts);

module.exports = router;