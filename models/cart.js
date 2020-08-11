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
}