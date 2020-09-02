const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart; // {items: []}
        this._id = id;
    }

    save(){
        const db = getDb();
        db.collection('users').insertOne(this);
    }

    addToCart(product) {
         // const cartProduct = this.cart.items.findIndex(cp => {
         //     return cp._id === product._id;
         // });

         const updatedCart = {items: [{...product, quality: 1}]}
         const db = getDb();
         return db.collection('users').updateOne(
             { _id: new ObjectId(this._id)},
             { $set: { cart: updatedCart }}
         );
    }

    static findByID(id){
        const db = getDb();
        return db.collection('users').findOne({ _id: new mongodb.ObjectId(id) });
    }
}
module.exports = User;