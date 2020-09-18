const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

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
            errorMessage: null
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
                'admin/add-product',
                {
                    pageTitle: 'Edit Product',
                    path: '/admin/edit-product',
                    activeAddProduct: true,
                    editing: editMode,
                    oldInput: product,
                    validationErrors: [],
                    errorMessage: null
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
                errorMessage: null
            }
        );
    }
    const product = new Product({
        _id: new mongoose.Types.ObjectId('5f6119df8c2f8077bc6bf14f'),
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
            console.log('Error Add Product');
            // return res.render(
            //     'admin/add-product',
            //     {
            //         pageTitle: 'Add Product',
            //         path: '/admin/add-product',
            //         editing: false,
            //         validationErrors: [],
            //         oldInput: product,
            //         errorMessage: 'Database operation failed, please try again.'
            //     }
            // );
            res.redirect('/500');
        })
    ;
};
exports.postEditProduct = (req, res, next) => {
    const errors = validationResult(req);
        const _id = req.body.productId;
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;

    if (!errors.isEmpty()){
        return res.render(
            'admin/add-product',
            {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                activeAddProduct: true,
                editing: true,
                oldInput: {
                    _id: _id,
                    title: title,
                    imageUrl: imageUrl,
                    price: price,
                    description: description,
                },
                validationErrors: errors.array(),
                errorMessage: null
            }
        );
    }

    Product.findById(_id).then(product => {
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