const router = require("express").Router();
const controller = require("../controller/user_controller");
const passwordController = require("../controller/password_controller");
const product = require("../controller/product");
const authorize = require("../middleware/token_auth");
//REGISTER ROUTE
router.post("/register", controller.user_register);

//login page
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", controller.user_login);

//home
router.get("/", (req, res) => {
  res.render("index");
});
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

//product list
router.get("/productlist", product.product_list);

//contact us
router.post("/contactus", controller.contact_us);

//cart
router.post("/addtoCart", authorize, product.addcart);
router.post("/updatetoCart", authorize, product.updatecart);
router.post("/deletetoCart", authorize, product.deletecart);

//apply coupons 
router.post('/coupons', authorize, product.coupons)

module.exports = router;
