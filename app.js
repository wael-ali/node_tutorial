const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// require routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const User = require('./models/user');

const app = express();
// Configrations settings.
app.set('view engine', 'ejs');
app.set('views', 'views');

// All Requests Middleware
app.use((req, res, next) => {
    User.findById('5f525531ccde7334f0498b1a')
        .then(user => {
            req.user = new User(user.username, user.email, user.cart, user._id);
            next();
        })
        .catch(err => {
            console.log(err);
        })
    ;
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
// // Routes Middleware
app.use(adminRoutes);
app.use(shopRoutes);
// // NOT FOUND PAGE
app.use(errorRoutes);

const url = 'mongodb+srv://node_toturial_1:tfO3QFaZHWuAKoJe@cluster0.q4mpc.mongodb.net/shop?retryWrites=true&w=majority';
mongoose
    .connect(url)
    .then((result) => {
        User.findOne()
            .then(user => {
                if (!user){
                    const user = new User({
                        name: 'Max',
                        email: 'max@example.com'
                    });
                    user.save();
                }
            })
            .catch(err => console.log(err))
        ;
        app.listen(3000);
    })
    .catch(err => console.log(err))
;


