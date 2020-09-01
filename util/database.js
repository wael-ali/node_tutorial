
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = 'mongodb+srv://node_toturial_1:tfO3QFaZHWuAKoJe@cluster0.q4mpc.mongodb.net/shop?retryWrites=true&w=majority';
let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then(client => {
            _db = client.db();
            callback(client);
        })
        .catch(err => {
            console.log('ERROR:',err);
        })
    ;
};

const getDb = () => {
    if (_db){
        return _db;
    }
    throw 'No database found!';
}

exports.mogoConnect = mongoConnect;
exports.getDb = getDb;

