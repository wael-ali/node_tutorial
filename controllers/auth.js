const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false
  })
};
exports.postLogin = (req, res, next) => {
    User.findById('5f5867be1a6b426540579757')
        .then(user => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            // the redirect will be fired indepently from saving session => page will be rendered before
            // the session is saved in db to prevent that in such cases we use the session.save(callback)
            req.session.save(err => {
                console.log(err);
                res.redirect('/');
            });
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