const router = require("express").Router();
const controller = require("../controller/user_controller");
const passwordController = require("../controller/password_controller");
const product = require("../controller/product");
const authorize = require("../middleware/token_auth");
const axios = require("axios");
const { check, validationErrors } = require("express-validator");
//login page
router.get("/login", (req, res) => {
  res.render("login");
});

function SendMailError() {
  return [
    check("email")
      .isLength({ min: 10 })
      .withMessage("Please Enter a valid email id"),
  ];
}

//send mail (GMAIL)
router.get("/SendMail", SendMailError(), controller.sendEmail);

//home
router.get("/", async (req, res) => {
  try {
    const productlist = await axios.get(
      "http://localhost:3000/api/productlist"
    );
    res.render("index", { productlist: productlist.data.product_list });
  } catch (err) {
    // if (error.response) {
    //   console.log(error)
    // }
  }
});

//about page
router.get("/about", (req, res) => {
  res.render("about");
});

//service page
router.get("/services", async (req, res) => {
  try {
    const productlist = await axios.get(
      "http://localhost:3000/api/productlist"
    );
    res.render("services", { productlist: productlist.data.product_list });
  } catch (err) {
    if (error.response) {
      console.log(error);
    }
  }
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
router.get("/shop", async (req, res) => {
  try {
    const getproductlist = await axios.get(
      "http://localhost:3000/api/productlist"
    );

    res.render("shop", { productlist: getproductlist.data.product_list });
  } catch (error) {
    if (error.response) {
      console.log(error);
    }
  }
});

router.get("/SuccessGoogle", controller.SuccessGoogle);
router.get("/Failurelogin", controller.FailureGoogle);

module.exports = router;
