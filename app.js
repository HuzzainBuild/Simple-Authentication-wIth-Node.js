const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

// Setting Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
// Mongoose Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/DataValidationDb")
  .then(() => {
    console.log(`Database Connected...`);
  });

const UserSechema = new mongoose.Schema({
  username: {
    type: String,
  },

  password: String,
});

const User = new mongoose.model("User", UserSechema);

// Home Route
app
  .route("/")
  .get(async (req, res) => {
    res.send("home");
  })
  .post(async (req, res) => {
    res.send("home");
  });

// Home Route
app
  .route("/register")
  .get(async (req, res) => {
    res.render("register");
  })
  .post(async (req, res) => {
    console.log(req.body);

    const { username, password } = req.body;

    const newUser = new User({
      username: username,
      password: password,
    });

    newUser
      .save()
      .then(() => console.log("Register Successful"))
      .catch((e) => {
        console.log(e.message);
      });
    res.render("register");
  });

// Home Route
app
  .route("/login")
  .get(async (req, res) => {
    res.render("login");
  })
  .post(async (req, res) => {
    console.log(req.body);

    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    console.log(user);

    if (user) {
      if (password === user.password) {
        console.log("Login Suceess full");
        res.send("You are Login");
      } else {
        console.log("Password not correct");
        res.send("Check your password");
      }
    } else {
      console.log("No user found");
      res.send("No User with the Username");
    }
  });

// Listen Route
app.listen(5000, () =>
  console.log(`Server is running on 5000...`)
);
