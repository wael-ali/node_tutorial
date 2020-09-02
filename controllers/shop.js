const Product = require('../models/product');
// const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
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

    Product.findByID(prodId)
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

    Product.fetchAll()
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
    Product.findByID(prodId)
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
// exports.getOrders = (req, res, next) => {
//     req.user.getOrders({ include: ['products']})
//         .then(orders => {
//             res.render('shop/orders', {
//               orders: orders,
//               pageTitle: 'Your Orders',
//               path: '/orders',
//             });
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     ;
// };
// exports.postDeleteCartItem = (req, res, next) => {
//     const productId = req.body.productId;
//     req.user.getCart()
//         .then(cart => {
//               return cart.getProducts({ where: { id: productId } });
//         })
//         .then(products => {
//             const product = products[0];
//             return product.cartItem.destroy();
//         })
//         .then(result => {
//             res.redirect('/cart');
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     ;
// };
//
// exports.postOrder = (req, res, next) => {
//     let userCart;
//     req.user.getCart()
//         .then(cart => {
//             userCart = cart;
//             return cart.getProducts();
//         })
//         .then(products => {
//             return req.user.createOrder()
//                 .then(order => {
//                     order.addProducts(products.map(product => {
//                         product.orderItem = { quantity: product.cartItem.quantity }
//                         return product;
//                     }));
//                 })
//             ;
//         })
//         .then(result => {
//            return userCart.setProducts(null);
//         })
//         .then(result => {
//             res.redirect('/orders');
//         })
//         .catch(err => console.log(err));
// };