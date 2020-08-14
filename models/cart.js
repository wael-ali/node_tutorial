const fs = require('fs');
const path = require('path');

const cartPath = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, procutPrice){
        // Fetch the previous cart.
        let cart = {products: [], totalPrice: 0};
        fs.readFile(cartPath,(err, fileContent) => {
            if (!err){
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => Find existing product.
            const existingProduct = cart.products.find(prod => prod.id === id);
            let updatedProduct;
            // Add new product / increase quantity.
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = existingProduct.qty + 1;
                cart.products = cart.products.filter(p => p.id !== existingProduct.id);
                cart.products.push(updatedProduct);

            }else {
                updatedProduct = {id: id, qty: 1};
                cart.products.push(updatedProduct);
            }
            cart.totalPrice = cart.totalPrice + +procutPrice;
            fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
                console.log(err)
            });
        });
    }

    static deleteProduct(id, productPrice){
        fs.readFile(cartPath, (err, fileContent) => {
            if (err){
                return;
            }
            const cart = JSON.parse(fileContent);
            const updatedCart = {...cart};
            const product = updatedCart.products.find(prod => prod.id === id);
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - product.qty * productPrice;
            fs.writeFile(cartPath, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    };

    static getCart(callback) {
      fs.readFile(cartPath, (err, fileContent) => {
          if (err){
              callback(null);
          }else {
              const cart = JSON.parse(fileContent);
              callback(cart);
          }

      })
    };
}