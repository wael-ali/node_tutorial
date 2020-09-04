const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/admin/add-product', adminController.getAddProduct);
router.post('/product',adminController.postAddProduct);
router.get('/admin/edit-product/:productId', adminController.getEditProduct);
router.post('/admin/edit-product', adminController.postEditProduct);
// router.post('/admin/delete-product/:productId', adminController.postDeleteProduct);
router.get('/admin/products', adminController.getProducts);

module.exports = router;