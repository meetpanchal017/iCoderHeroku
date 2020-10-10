const express = require("express");
const path = require("path");
const fs = require("fs");
const { static } = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/iCoder", { useNewUrlParser: true });
const port = 80;

//Define mongoose schema

//contact us
const contactSchema = new mongoose.Schema({
  email: String,
  concern: String,
  about: String,
  member: Boolean
});
const contact = mongoose.model("contact", contactSchema);

//login
const loginSchema = new mongoose.Schema({
  email: String,
  password: String
});
const login = mongoose.model("login", loginSchema);

//signup
const signupSchema = new mongoose.Schema({
  email: String,
  password: String
});
const signup = mongoose.model("signup", signupSchema);

//Express specific stuff
// app.use(express.static('public', options))
app.use("/static", express.static("static"));
app.use(express.urlencoded());

//Pug specific stuff
app.set("view engine", "pug"); //set template engine as pug
app.set("views", path.join(__dirname, "views")); //set views directory

//EndPoints
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("index.pug", params);
});
app.get("/about", (req, res) => {
  const params = {};
  res.status(200).render("about.pug", params);
});
app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
  var iCoderData = new contact(req.body);
  iCoderData
    .save()
    .then(() => {
      res.send("This item has been saved to database");
    })
    .catch(() => {
      res.status(400).send("Item has not saved to the database");
    });
});

app.post("/login", (req, res) => {
  var loginData = new login(req.body);
  loginData
    .save()
    .then(() => {
      res.send("Now you are login in!");
    })
    .catch(() => {
      res.status(400).send("Item has not saved to the database");
    });
});

app.post("/signup", (req, res) => {
  var signupData = new signup(req.body);
  signupData
    .save()
    .then(() => {
      res.send("Thank you for signup in iCoder!");
    })
    .catch(() => {
      res.status(400).send("Item has not saved to the database");
    });
});

app.listen(port, () => {
  console.log(`The application successfully started on port ${port}`);
});
