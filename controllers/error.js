exports.get404 = (req, res, next) => {
  return res.status(404).render(
    '404', 
    {
        pageTitle: 'Not Found',
        path: '',
        isAuthenticated: req.session.isLoggedIn
    }
  );
};