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
            res.redirect('/')
        })
        .catch(err => {
            console.log(err);
        })
    ;
};