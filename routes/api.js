const router = require("express").Router();
const passwordController = require("../controller/password_controller");
const product = require("../controller/product");
const authorize = require("../middleware/token_auth");
const controller = require("../controller/user_controller");
const Orders = require("../controller/order");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

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
router.post("/coupons", authorize, product.coupons);

//Place Order
router.post("/Order", authorize, Orders.place_order);

//import product csv
router.post(
  "/import_product_csv",
  upload.single("import_csv"),
  product.csv_import
);

//send mail (GMAIL)
router.post("/SendMail", controller.sendEmail);

module.exports = router;
