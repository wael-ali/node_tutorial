const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// require routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const mongoConnect  = require('./util/database').mogoConnect;
const User = require('./models/user');

const app = express();
// Configrations settings.
app.set('view engine', 'ejs');
app.set('views', 'views');

// All Requests Middleware
app.use((req, res, next) => {
    User.findByID('5f4e42046d64efc8f586399d')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        })
    ;
    next();
})
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
// // Routes Middleware
app.use(adminRoutes);
app.use(shopRoutes);
// // NOT FOUND PAGE
app.use(errorRoutes);

mongoConnect(() => {
    app.listen(3000);
})