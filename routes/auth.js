const express = require('express');
const { check, body, cookie } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);
router.get('/signup', authController.getSignup);
router.post(
    '/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Invalid Email')
            .custom((value, {req, location}) => {
                // if (value === 'test@test.com'){
                //     throw new Error('This is forbidden email..')
                // }
                // return true;
                return User.findOne({email: value})
                    .then(userDoc => {
                        if (userDoc){
                            return Promise.reject('E-mail Exists already, please choose a different one.');
                        }
                    })
                ;
            }),
        body('password', 'Please enter a password with only numbers and text at least 5 characters')
            .isLength({min: 5})
            .isAlphanumeric()
        ,
        body('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password){
                    throw new Error('Passwords have to match!!')
                }
                return true;
            })
        ,
    ],
    authController.postSignup
);
router.get('/reset-password', authController.getResetPassword);
router.post('/reset', authController.postReset);
router.get('/reset/:token', authController.getNewPassword);
router.post('/new-password', authController.postNewPassword);

module.exports = router;