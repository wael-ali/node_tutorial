const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// require routes
// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
// const errorRoutes = require('./routes/error');

const mongoConnect = require('./util/database');

const app = express();
// Configrations settings.
app.set('view engine', 'ejs');
app.set('views', 'views');

// All Requests Middleware
app.use((req, res, next) => {
    // User.findByPk(1)
    //     .then(user => {
    //         req.user = user;
    //         next();
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // ;
    next();
})
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, 'public')));
// // Routes Middleware
// app.use(adminRoutes);
// app.use(shopRoutes);
// // NOT FOUND PAGE
// app.use(errorRoutes);

mongoConnect(client => {
    console.log(client);
    app.listen(3000);
})