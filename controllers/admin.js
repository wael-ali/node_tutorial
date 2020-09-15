const { validationResult } = require('express-validator');

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
                }
            );
        })
        .catch(err => {
            console.log(err);
        })
    ;
};

exports.postAddProduct = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.render(
            'admin/add-product',
            {
                pageTitle: 'Add Product',
                path: '/admin/add-product',
                editing: false,
                validationErrors: errors.array(),
                oldInput: {
                    title: req.body.title,
                    imageUrl: req.body.imageUrl,
                    price: req.body.price,
                    description: req.body.description,
                },
            }
        );
    }
    const product = new Product({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description,
        userId: req.session.user._id
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
        if (product.userId.toString() !== req.user._id.toString()){
            return res.redirect('/');
        }
        product.title       = title;
        product.imageUrl    = imageUrl;
        product.price       = price;
        product.description = description;

        return product.save()
            .then(result => {
                res.redirect('/admin/products');
            })
        ;
        })
        .catch(err => {
            console.log(err);
        })
    ;
};
exports.getProducts = (req, res, next) => {
    Product.find({ userId: req.user._id })
        // .select('title price -_id') // to choose which fields want to return from a schema
        // .populate('userId', 'name') // to fetch related documents and wich field to return from them
        .then((products) => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
            });
        })
        .catch(err => {
            console.log(err);
        })
    ;
};
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteOne({ _id: prodId, userId: req.user._id })
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        })
    ;
};