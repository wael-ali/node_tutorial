const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
        .then(([prod]) => {
            res.render('shop/product-details', {
                product: prod[0],
                pageTitle: prod[0].title,
                path: '/products'
            });
        })
        .catch(err => {
            console.log(err);
        })
    ;
};

exports.getIndex = (req, res, next) => {

    Product.findAll()
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
    Cart.getCart((cart) => {
        Product.fetchAll((products) => {
            const cartProdcuts = [];
            for (product of products){
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData){
                    cartProdcuts.push({
                        productData: product,
                        qty: cartProductData.qty
                    });
                }
            }
            res.render('shop/cart', {
              products: cartProdcuts,
              pageTitle: 'Your Cart',
              path: '/cart',
            });
        });
    })
};
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(product.id, product.price);
    })
    res.redirect('/cart');
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
exports.postDeleteCartItem = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId,product => {
        Cart.deleteProduct(productId, product.price);
        res.redirect('/cart');
    })
};