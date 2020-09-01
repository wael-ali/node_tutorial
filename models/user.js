const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    save(){
        const db = getDb();
        db.collection('users').insertOne(this);
    }

    static findByID(id){
        const db = getDb();

        return db.collection('users').findOne({ _id: new mongodb.ObjectId(id) });
    }
}
module.exports = User;