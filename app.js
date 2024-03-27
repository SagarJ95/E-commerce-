const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

app.use(express.static(__dirname + "/public"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//login page
app.get("/", (req, res) => {
  res.render("login");
});

//about page
app.get("/about", (req, res) => {
  res.render("about");
});

//service page
app.get("/services", (req, res) => {
  res.render("services");
});

// blog page
app.get("/blog", (req, res) => {
  res.render("blog");
});

//contact page
app.get("/contact", (req, res) => {
  res.render("contact");
});

//cart page
app.get("/cart", (req, res) => {
  res.render("cart");
});

//shop page
app.get("/shop", (req, res) => {
  res.render("shop");
});

app.listen(PORT, () => {
  console.log("connnect");
});
