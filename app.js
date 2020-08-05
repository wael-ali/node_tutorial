const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

const rootDir = require('./util/path');


const app = express();
// Configrations settings.
// app.engine(
  // 'hbs',
  //  expressHbs({ 
      // defaultLayout: 'main-layout',
      // layoutsDir: 'views/layouts/',
      // extname: 'hbs'
    // })
// );
app.set('view engine', 'ejs');
app.set('views', 'views');
// app.set('view engine', 'hbs');
// app.set('view engine', 'pug');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');
// template engine 
// All Requests Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
// Other Middleware
app.use(adminRoutes);
app.use(shopRoutes);
// NOT FOUND PAGE
app.use(errorRoutes);
app.listen(3000);