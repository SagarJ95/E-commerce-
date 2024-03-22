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

app.listen(PORT, () => {
  console.log("connnect");
});
