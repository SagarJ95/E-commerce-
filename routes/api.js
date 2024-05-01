const router = require("express").Router();
const passwordController = require("../controller/password_controller");
const product = require("../controller/product");
const authorize = require("../middleware/token_auth");
const controller = require("../controller/user_controller");

//REGISTER ROUTE
router.post("/register", controller.user_register);

//login
router.post("/login", controller.user_login);

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
