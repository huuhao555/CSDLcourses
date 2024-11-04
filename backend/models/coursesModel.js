const mongoose = require("mongoose");

const Courses = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  quantityInStock: { type: Number, required: true }
});

module.exports = mongoose.model("Courses", Courses, "courses");
