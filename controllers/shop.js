const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
      .then((products) => {
          res.render('shop/products-list', {
              prods: products,
              pageTitle: 'All Products',
              path: '/products',
          });
      })
      .catch(err => {
          console.log(err);
      })
  ;
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;

    Product.findById(prodId)
        .then((prod) => {
            res.render('shop/product-details', {
                product: prod,
                pageTitle: prod ? prod.title : 'Error',
                path: '/products'
            });
        })
        .catch(err => {
            console.log(err);
        })
    ;
};

exports.getIndex = (req, res, next) => {

    Product.find()
        .then((products) => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop index',
                path: '/',
            });
        })
        .catch(err => {
            console.log(err);
        })
    ;
};
exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            products = user.cart.items;
            console.log('-------------------',products);
            res.render('shop/cart', {
              products: products,
              pageTitle: 'Your Cart',
              path: '/cart',
            });
        })
        .catch(err => {
            console.log(err);
        })
    ;
};
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        })
    ;
};
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
      prods: [],
      pageTitle: 'Your Checkout',
      path: '/checkout',
    });
};
exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            console.log(orders);
            res.render('shop/orders', {
              orders: orders,
              pageTitle: 'Your Orders',
              path: '/orders',
            });
        })
        .catch(err => {
            console.log(err);
        })
    ;
};
exports.postDeleteCartItem = (req, res, next) => {
    const productId = req.body.productId;
    req.user.removeFromCart(productId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        })
    ;
};

exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(item => {
                return { quantity: item.quantity, product: {...item.productId._doc}};
            });
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err))
    ;
};