const router = require("express").Router();
const controller = require("../controller/user_controller");
const passwordController = require('../controller/password_controller');

//REGISTER ROUTE
router.post("/register", controller.user_register);

//login page
router.get("/login", (req, res) => {
  res.render("login");
});
router.post('/login', controller.user_login);

//about page
router.get("/about", (req, res) => {
  res.render("about");
});

//service page
router.get("/services", (req, res) => {
  res.render("services");
});

// blog page
router.get("/blog", (req, res) => {
  res.render("blog");
});

//contact page
router.get("/contact", (req, res) => {
  res.render("contact");
});

//cart page
router.get("/cart", (req, res) => {
  res.render("cart");
});

//shop page
router.get("/shop", (req, res) => {
  res.render("shop");
});


//forget password
router.post("/forget-password", passwordController.forget_password);

//Reset password
router.post("/reset-password", passwordController.reset_password);

module.exports = router;
