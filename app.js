const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const scrf = require('csurf');
const flash = require('connect-flash');
// require routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');
const authRouter = require('./routes/auth');

const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://node_toturial_1:tfO3QFaZHWuAKoJe@cluster0.q4mpc.mongodb.net/shop?retryWrites=true&w=majority';

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
const csrfProtection = scrf();
// Configrations settings.
app.set('view engine', 'ejs');
app.set('views', 'views');

// All Requests Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'some secret', // used to hash the session
        resave: false, // means the session will not be saved on every req/res but only if something changed in the session
        saveUninitialized: false,
        store: store,
    })
);
app.use(csrfProtection);
app.use(flash())
app.use((req, res, next) => {
    if (!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user){
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
            throw new Error(err);
        })
    ;
});
// Variables which are should be available in all views
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});
// // Routes Middleware
app.use(adminRoutes);
app.use(shopRoutes);
app.use(authRouter);
// // 404, 500 pages
app.use(errorRoutes);
// Handling errors
app.use((error, req, res, next) => {
    res.redirect('/500');
})

mongoose
    .connect(MONGODB_URI,  { useNewUrlParser: true,  useUnifiedTopology: true  } )
    .then((result) => {
        app.listen(3000);
    })
    .catch(err => console.log(err))
;


