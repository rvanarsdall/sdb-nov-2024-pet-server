/* 
1- import mongoose
2- create a variable that will store the schema (defines what the collection will look like)
3- create the object of what the data in the collection will look like
4- export the model to be used in other files
*/

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//                           Name of Collection, Schema
module.exports = mongoose.model("User", UserSchema);
