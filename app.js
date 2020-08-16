const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// require routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const rootDir = require('./util/path');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');


const app = express();
// Configrations settings.
app.set('view engine', 'ejs');
app.set('views', 'views');

// template engine
// All Requests Middleware
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        })
    ;
})
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
// Routes Middleware
app.use(adminRoutes);
app.use(shopRoutes);
// NOT FOUND PAGE
app.use(errorRoutes);
// Manage Relations between Models.
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product)
User.hasOne(Cart);
Cart.belongsTo(User);
// many to many relation cart-product
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});



// to automatically synchronize all models
sequelize
    // .sync({ force: true}) // this will drop all tables and force new changes. Dont use it in production.
    .sync()
    .then((result) => {
        // console.log(result);
        return User.findByPk(1);
    })
    .then(user => {
        if (!user){
            return User.create({name: 'Max', email: 'test@test.com'});
        }
        return user;
    })
    .then(user => {
        console.log(user);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })
;