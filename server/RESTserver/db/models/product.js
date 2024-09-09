const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
});

const ManufactureSchema = new Schema({
  name: {type: String, required: true},
  country: {type: String, required: true},
  website: {type: String, required: true},
  description: {type: String, required: true},
  address: {type: String, required: true},
  contact: {type: ContactSchema, required: true},
});

const ProductSchema = new Schema({
  name: {type: String, required: true},
  sku: {type: String, required: true},
  description: {type: String, required: false},
  price: {type: Number, required: true},
  category: {type: String, required: true},
  manufacturer: {type: ManufactureSchema, required: true},
  amountInStock: {type: Number, required: true, min: 0},
});

const productModel = mongoose.model("Product", ProductSchema);

module.exports = productModel;
