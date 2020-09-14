const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');

const User = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

exports.getLogin = (req, res, next) => {
    let msg = req.flash('error');
    msg = msg.length > 0 ? msg[0] : null;
  res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      error: msg
  })
};
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
        .then(user => {
            if (!user){
                req.flash('error', 'Wrong Email/Password combination!!');
                return res.redirect('/login');
            }
            return bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    console.log('do match', doMatch);
                    if (doMatch){
                        req.session.user = user;
                        req.session.isLoggedIn = true;
                        // the redirect will be fired indepently from saving session => page will be rendered before
                        // the session is saved in db to prevent that in such cases we use the session.save(callback)
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    req.flash('error', 'Wrong Email/Password combination!!');
                    return res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    return res.redirect('/login');
                })
            ;
        })
        .catch(err => {
            console.log(err);
        })
    ;
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    })
};

exports.getSignup = (req, res, next) => {
    let msg = req.flash('error');
    msg = msg.length > 0 ? msg[0] : null;
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        error: msg,
    })
};
exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({email: email})
        .then(userDoc => {
            if (userDoc){
                req.flash('error', 'E-mail Exists already, please choose a different one .');
                return res.redirect('/signup');
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        password: hashedPassword,
                        cart: { items: [] }
                    });
                    return user.save();
                })
            ;
        })
        .then(result => {
            res.redirect('/login');
            return transporter.sendMail({
                to: email,
                from: 'shop@node-tutorial.com',
                subject: 'Signup succeeded!',
                html: '<h1>You successfully signed up!!</h1>'
            });
        })
        .catch(err => console.log(err))
    ;
};

exports.getResetPassword = (req, res, next) => {
    let msg = req.flash('error');
    msg = msg.length > 0 ? msg[0] : null;

    res.render('auth/get-email', {
        path: '/reset-password',
        pageTitle: 'Reset Password',
        error: msg
    });
};

exports.postReset = (req, res, next) => {
    const email = req.body.email;
    crypto.randomBytes(32, (err, buffer) => {
        if (err){
            console.log(err);
            return res.redirect('/reset-password');
        }
        const token = buffer.toString('hex'); // the buffer contains hexadecimals this option can convert the into ascii
        User.findOne({ email: email})
            .then(user => {
                if (!user){
                    req.flash('error', 'No account for this email');
                    return res.redirect('/reset-password');
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save();
            })
            .then(result => {
                res.redirect('/');
                transporter.sendMail({
                    to: email,
                    from: 'shop@node-tutorial.com',
                    subject: 'Reset Password',
                    html: `
                    <p>You requested a password reset</p>
                    <p>Click this <a href='http://localthost:3000/reset/${token}'>link</a> to set a new password</p>
                    `
                });
            })
            .catch(err => {
                console.log(err);
            })
        ;
    })
};