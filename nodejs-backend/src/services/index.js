const products = require("./products/products.service.js");
const category = require("./category/category.service.js");
const orders = require("./orders/orders.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(products);
  app.configure(category);
  app.configure(orders);
    // ~cb-add-configure-service-name~
};
