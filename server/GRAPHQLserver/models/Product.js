/* const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Contact schema
const ContactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
});

//Manufacturer schema
const ManufactureSchema = new Schema({
  name: String,
  country: String,
  website: String,
  description: String,
  address: String,
  contact: ContactSchema,
});

//Product schema
const ProductSchema = new Schema({
  name: String,
  sku: Number,
  description: String,
  price: Number,
  category: String,
  manufacturer: ManufactureSchema,
  amountInStock: Number,
});

//Product model
const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
 */




//dena kod innehåller validering för obligatoriska fält 


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Contact schema
const ContactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Contact name is required"], // Validering för namn
  },
  email: {
    type: String,
    required: [true, "Contact email is required"], // Validering för email
    match: [/.+@.+\..+/, "Please enter a valid email address"], // Regex för e-postvalidering
  },
  phone: {
    type: String,
    required: [true, "Contact phone is required"], // Validering för telefon
  },
});

// Manufacturer schema
const ManufactureSchema = new Schema({
  name: {
    type: String,
    required: [true, "Manufacturer name is required"], // Validering för tillverkarens namn
  },
  country: {
    type: String,
    required: [true, "Manufacturer country is required"], // Validering för land
  },
  website: String,
  description: String,
  address: String,
  contact: ContactSchema,
});

// Product schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"], // Validering för produktnamn
  },
  sku: {
    type: Number,
    required: [true, "SKU is required"], // Validering för SKU
    unique: true, // Unik SKU
  },
  description: {
    type: String,
    required: [true, "Product description is required"], // Validering för beskrivning
  },
  price: {
    type: Number,
    required: [true, "Product price is required"], // Validering för pris
    min: [0, "Price must be a positive number"], // Validering för att pris måste vara positivt
  },
  category: {
    type: String,
    required: [true, "Product category is required"], // Validering för kategori
  },
  manufacturer: {
    type: ManufactureSchema,
    required: [true, "Manufacturer information is required"], // Validering för tillverkare
  },
  amountInStock: {
    type: Number,
    required: [true, "Amount in stock is required"], // Validering för lagerantal
    min: [0, "Amount in stock must be a non-negative number"], // Validering för att lagerantal måste vara icke-negativt
  },
});

// Product model
const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
