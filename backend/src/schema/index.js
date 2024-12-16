const mongoose = require("mongoose");
const productSchema = require("./product.schema");

require("dotenv").config();

const mongoToken = process.env.mongodb;
mongoose
  .connect(mongoToken)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

const Product = mongoose.model("products", productSchema);

module.exports = {
  Product,
};
