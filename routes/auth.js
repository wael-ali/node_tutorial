const express = require('express');
const { check } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);
router.get('/signup', authController.getSignup);
router.post(
    '/signup',
    check('email')
        .isEmail()
        .withMessage('Invalid Email')
        .custom((value, {req, location}) => {
            if (value === 'test@test.com'){
                throw new Error('This is forbidden email..')
            }
            return true;
        })
    ,
    authController.postSignup
);
router.get('/reset-password', authController.getResetPassword);
router.post('/reset', authController.postReset);
router.get('/reset/:token', authController.getNewPassword);
router.post('/new-password', authController.postNewPassword);

module.exports = router;