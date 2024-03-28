const router = require("express").Router();

//login page
router.get("/", (req, res) => {
  res.render("login");
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

module.exports = router;
