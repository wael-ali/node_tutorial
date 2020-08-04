const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const products = [];
const router = express.Router();

router.use('/admin/add-product',(req, res, next) => {
  res.render(
    'add-product', {
       pageTitle: 'Add Product', 
       path: '/admin/add-product',
       formsCSS: true,
       activeAddProduct: true,
       productCSS: true
      }
  );
});

router.post('/product',(req, res, next) => {
  products.push({ title: req.body.title });
  console.log(products);
  res.redirect('/');
});

exports.router = router;
exports.products = products;