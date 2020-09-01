
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = 'mongodb+srv://node_toturial_1:tfO3QFaZHWuAKoJe@cluster0.q4mpc.mongodb.net/test?retryWrites=true&w=majority';

const mongoConnect = (callback) => {
    MongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then(client => {
            callback(client);
        })
        .catch(err => {
            console.log('ERROR:',err);
        })
    ;
};

module.exports = mongoConnect;

