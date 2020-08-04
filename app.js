const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const rootDir = require('./util/path');


const app = express();
// Configrations settings.
app.engine(
  'hbs',
   expressHbs({ 
      defaultLayout: 'main-layout',
      layoutsDir: 'views/layouts/',
      extname: 'hbs'
    })
);
app.set('view engine', 'hbs');
app.set('views', 'views');
// app.set('view engine', 'pug');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// template engine 
// All Requests Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
// Other Middleware
app.use(adminData.router);
app.use(shopRoutes);
// NOT FOUND PAGE
app.use((req, res, next) => {
  return res.status(404).render('404', { pageTitle: 'Not Found'});
});
app.listen(3000);