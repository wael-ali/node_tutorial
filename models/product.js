const getDb = require('../util/database').getDb;

class Product {
    imageUrl;
    title;
    price;
    description;
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {

    }
}




// const {Sequelize, DataTypes} = require('sequelize');
//
// const sequelize = require('../util/database');
//
// const Product = sequelize.define('product', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     title: DataTypes.STRING,
//     price: {
//         type: DataTypes.DOUBLE,
//         allowNull: false,
//     },
//     imageUrl: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     description: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// });

module.exports = Product;