const router = require("express").Router();
const controller = require("../controller/user_controller");
const passwordController = require("../controller/password_controller");
const product = require("../controller/product");
const authorize = require("../middleware/token_auth");
const axios = require('axios')

//login page
router.get("/login", (req, res) => {
  res.render("login");
});

//home
router.get("/", (req, res) => {
  res.render('index')
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
router.get("/shop", async (req, res) => {
  try {
    const getproductlist = await axios.get('http://localhost:3000/api/productlist');

    res.render('shop', { productlist: getproductlist.data.product_list })
  } catch (err) {
    if (error.response) {
      console.log(error)
    }
  }
});


module.exports = router;
