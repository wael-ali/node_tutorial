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
    Product.findByPk(prodId)
        .then((prod) => {
            res.render('shop/product-details', {
                product: prod,
                pageTitle: prod.title,
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
    req.user.getCart()
        .then(cart => {
            return cart.getProducts();
        })
        .then(products => {
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
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } })
        })
        .then(products => {
            let product;
            if (products.length > 0){
                product = products[0];
            }
            let newQuantity = 1;
            // adding the same product to the cart.
            if (product){
               // ...
            }
            // adding new product to cart.
            return Product.findByPk(prodId)
                .then(product => {
                    fetchedCart.addProduct(product, {
                        through: { quantity: newQuantity}
                    });
                })
                .catch(err => {
                    console.log(err);
                })
            ;
        })
        .then(() => {
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