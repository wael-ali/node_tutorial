const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render(
        'admin/edit-product',
        {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            formsCSS: true,
            activeAddProduct: true,
            productCSS: true,
            editing: false,
            isAuthenticated: req.session.isLoggedIn
        }
    );
};
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode){
        return res.redirect('/');
    }

    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product){
                return res.redirect('/');
            }
            res.render(
                'admin/edit-product',
                {
                    pageTitle: 'Edit Product',
                    path: '/admin/edit-product',
                    formsCSS: true,
                    activeAddProduct: true,
                    productCSS: true,
                    editing: editMode,
                    product: product,
                    isAuthenticated: req.session.isLoggedIn
                }
            );
        })
        .catch(err => {
            console.log(err);
        })
    ;
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.session.user
    });
    product.save()
        .then((result) => {
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err);
        })
    ;
};
exports.postEditProduct = (req, res, next) => {
    const id        = req.body.productId;
    const title     = req.body.title;
    const imageUrl  = req.body.imageUrl;
    const price     = req.body.price;
    const description = req.body.description;

    Product.findById(id).then(product => {
        product.title       = title;
        product.imageUrl    = imageUrl;
        product.price       = price;
        product.description = description;

        return product.save();
        })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        })
    ;
};
exports.getProducts = (req, res, next) => {
    Product.find()
        // .select('title price -_id') // to choose which fields want to return from a schema
        // .populate('userId', 'name') // to fetch related documents and wich field to return from them
        .then((products) => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err);
        })
    ;
};
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findOneAndDelete(prodId)
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        })
    ;
};