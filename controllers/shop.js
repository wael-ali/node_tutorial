const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/products-list', { 
      prods: products, 
      pageTitle: 'All Products',
      path: '/products',
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop index',
      path: '/',
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
exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
      prods: [],
      pageTitle: 'Your Orders',
      path: '/orders',
    });
};