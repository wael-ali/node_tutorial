exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: req.isAuthenticated
  })
};
exports.postLogin = (req, res, next) => {
    req.isLogedIn = true;
    res.redirect('/');
};