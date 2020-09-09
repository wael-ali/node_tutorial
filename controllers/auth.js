exports.getLogin = (req, res, next) => {
    const isLoggedIn = req
        .get('Cookie')
        .split(';')[6]
        .trim()
        .split('=')[1] === 'true'
    ;
  res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: isLoggedIn
  })
};
exports.postLogin = (req, res, next) => {
    req.isAuthenticated = true;
    res.setHeader('Set-Cookie', 'LoggedIn=true');
    res.redirect('/')
};