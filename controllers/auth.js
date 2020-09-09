exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req
    //     .get('Cookie')
    //     .split(';')[6]
    //     .trim()
    //     .split('=')[1] === 'true'
    // ;
    console.log(req.session.isLoggedIn);
  res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false
  })
};
exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    // res.setHeader('Set-Cookie', 'LoggedIn=true; Max-Age=1000; Secure');
    // res.setHeader('Set-Cookie', 'LoggedIn=true; Expires');
    res.redirect('/')
};