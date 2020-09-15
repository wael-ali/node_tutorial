const path = require('path');

const express = require('express');
const { check, body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/admin/add-product', isAuth, adminController.getAddProduct);
router.post(
    '/product',
    isAuth,
    [
        body('title', 'At least 4 charecters, only numbers and letters')
            .trim()
            .isString()
            .isLength({ min: 4 })
        ,
        body('imageUrl')
            .trim()
            .isURL()
            .withMessage('Enter a valid image URL')
        ,
        body('price')
            .trim()
            .isDecimal()
            .withMessage('Decimal value please')
            .custom(value => {
                if (value < 0){
                    throw new Error('Negative Values are not valid');
                }
                return true;
            })
        ,
        body('description', 'At least 10 charecters, only numbers and letters')
            .trim()
            .isLength({ min: 10 })
        ,
    ],
    adminController.postAddProduct
);
router.get('/admin/edit-product/:productId',isAuth,  adminController.getEditProduct);
router.post('/admin/edit-product', isAuth, adminController.postEditProduct);
router.post('/admin/delete-product/:productId', isAuth, adminController.postDeleteProduct);
router.get('/admin/products', isAuth, adminController.getProducts);

module.exports = router;