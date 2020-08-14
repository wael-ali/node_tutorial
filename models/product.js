const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const Cart = require('./cart');
const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (callbackFunction) => {
  fs.readFile(p, (err, fileContent) => {
    if(err){
      callbackFunction([]);
    }else{
      callbackFunction(JSON.parse(fileContent));
    }
  });

};


module.exports = class Product {
  constructor(id,title, imageUrl, description, price){
    this.id        = id;
    this.title        = title;
    this.imageUrl     = imageUrl;
    this.description  = description;
    this.price        = price;

  }
  save() {
    getProductsFromFile((products) => {
      if (this.id){
        const existingProductIndex = products.findIndex(p => p.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p,JSON.stringify(updatedProducts), (error) => {
          console.log(error);
        });
      }else {

        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p,JSON.stringify(products), (error) => {
          console.log(error);
        });
      }
    });
  }

  static fetchAll(callbackFunction) {
    getProductsFromFile(callbackFunction);
  }

  static findById(id, cb){
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product );
    });
  }
  static deleteById(id) {
      getProductsFromFile(products => {
          const product = products.find( prod => prod.id === id);
          const updatedProducts = products.filter( prod => prod.id !== id);
          fs.writeFile(p, JSON.stringify(updatedProducts), err => {
              if (!err){
                  Cart.deleteProduct(id, product.price);
              }
          })
      })
  }
}