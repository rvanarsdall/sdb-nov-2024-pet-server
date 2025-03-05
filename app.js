const mongoose = require("mongoose");
const express = require("express");
const app = express();
const userController = require("./controller/user.controller");

const petController = require("./controller/pets.controller");

// Connecting to the Database
mongoose.connect("mongodb://localhost:27017/instapet-db");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));

// ! This (express.json()) will allow us to send a payload or request object to our server and our routes will be able to parse it.
app.use(express.json());

// *** Controller Routes ***

app.use("/user", userController);
app.use("/pet", petController);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
