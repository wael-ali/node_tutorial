const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/products-list', { 
      prods: products, 
      pageTitle: 'All Products',
      path: '/',
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop index',
      path: '/products',
    });
  });
};
exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
      prods: [],
      pageTitle: 'Your Cart',
      path: '/cart',
    });
};
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
      prods: [],
      pageTitle: 'Your Checkout',
      path: '/checkout',
    });
};