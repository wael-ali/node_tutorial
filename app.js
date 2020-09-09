const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
// require routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');
const authRouter = require('./routes/auth');

const User = require('./models/user');

const app = express();
// Configrations settings.
app.set('view engine', 'ejs');
app.set('views', 'views');

// All Requests Middleware
app.use((req, res, next) => {
    User.findById('5f5867be1a6b426540579757')
        .then(user => {
            req.user = new User(user);
            req.isAuthenticated = false;
            next();
        })
        .catch(err => {
            console.log(err);
        })
    ;
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'some secret', // used to hash the session
        resave: false, // means the session will not be saved on every req/res but only if something changed in the session
        saveUninitialized: false,
    })
);
// // Routes Middleware
app.use(adminRoutes);
app.use(shopRoutes);
app.use(authRouter);
// // NOT FOUND PAGE
app.use(errorRoutes);

const url = 'mongodb+srv://node_toturial_1:tfO3QFaZHWuAKoJe@cluster0.q4mpc.mongodb.net/shop?retryWrites=true&w=majority';
mongoose
    .connect(url,  { useNewUrlParser: true,  useUnifiedTopology: true  } )
    .then((result) => {
        User.findOne()
            .then(user => {
                console.log('mongose.connect::::::::::::',user);
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


