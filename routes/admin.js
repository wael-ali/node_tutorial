const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.use('/admin/add-product', adminController.getAddProduct);
router.use('/admin/edit-product/:productId', adminController.getEditProduct);
router.post('/product',adminController.postAddProduct);
router.get('/admin/products', adminController.getProducts);

module.exports = router;