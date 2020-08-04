const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('../routes/admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('shop', { 
    prods: adminData.products , 
    pageTitle: 'Shop Shop', 
    path: '/',
    hasProducts: adminData.products.length > 0,
    activeShop: true,
    productCSS: true
  });
});

module.exports = router;