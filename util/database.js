const Sequelize = require('sequelize');

const secualize = new Sequelize('node_1', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = secualize;
