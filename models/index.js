const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Customer = require("./customer")(sequelize, Sequelize);
db.Product = require("./product")(sequelize, Sequelize);
db.Order = require("./order")(sequelize, Sequelize);
db.Likes = require("./likes")(sequelize, Sequelize);
db.Review = require("./review")(sequelize, Sequelize);
db.City = require("./city")(sequelize, Sequelize);

db.Customer.hasMany(db.Order, { foreignKey: "customer_id", sourceKey: "id" });
db.Order.belongsTo(db.Customer, { foreignKey: "customer_id", sourceKey: "id" });
db.Product.hasMany(db.Order, { foreignKey: "product_id", sourceKey: "id" });
db.Order.belongsTo(db.Product, { foreignKey: "product_id", sourceKey: "id" });

db.Customer.hasMany(db.Likes, { foreignKey: "customer_id", sourceKey: "id" });
db.Likes.belongsTo(db.Customer, { foreignKey: "customer_id", sourceKey: "id" });
db.Product.hasMany(db.Likes, { foreignKey: "product_id", sourceKey: "id" });
db.Likes.belongsTo(db.Product, { foreignKey: "product_id", sourceKey: "id" });

db.Customer.hasMany(db.Review, { foreignKey: "customer_id", sourceKey: "id" });
db.Review.belongsTo(db.Customer, {
  foreignKey: "customer_id",
  sourceKey: "id"
});
db.Product.hasMany(db.Review, { foreignKey: "product_id", sourceKey: "id" });
db.Review.belongsTo(db.Product, { foreignKey: "product_id", sourceKey: "id" });

/* db.Order.belongsToMany(db.Product, { through: "order_product" });
db.Product.belongsToMany(db.Order, { through: "order_product" }); */

module.exports = db;
