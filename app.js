const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// require routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const rootDir = require('./util/path');
const sequelize = require('./util/database');


const app = express();
// Configrations settings.
app.set('view engine', 'ejs');
app.set('views', 'views');

// template engine
// All Requests Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
// Routes Middleware
app.use(adminRoutes);
app.use(shopRoutes);
// NOT FOUND PAGE
app.use(errorRoutes);

// to automatically synchronize all models
sequelize
    .sync()
    .then((result) => {
        // console.log(result);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })
;