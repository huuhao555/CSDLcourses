const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect successfully MongoDB");
  } catch (error) {
    console.log("Connect failed MongoDB");
    process.exit(1);
  }
};

module.exports = ConnectDB;
