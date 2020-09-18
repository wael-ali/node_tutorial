exports.get404 = (req, res, next) => {
  return res.status(404).render(
    '404', 
    {
        pageTitle: 'Not Found',
        path: '',
    }
  );
};

exports.get500 = (req, res, next) => {
  return res.status(500).render(
    '500',
    {
        pageTitle: '500 Error',
        path: '/500',
    }
  );
};