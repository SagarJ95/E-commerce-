const pooldb = require("../db/db");
const authorize = require("../middleware/token_auth");

module.exports.product_list = async (req, res) => {
  try {
    const productlist = await pooldb.query(
      "select * from _products where status = '1'"
    );

    if (productlist.rows.length == 0) {
      return res.status(400).json({ msg: "Product Not available" });
    } else {
      return res.status(200).json({ product_list: productlist.rows });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports.addcart = async (req, res) => {
  try {

    const { product_id, product_price, qty } = req.body;

    const addtocart = await pooldb.query("Insert into _cart(p_id,ip_add,qty,p_price) VALUES ($1,$2,$3,$4)", [
      product_id,
      req.user_id,
      qty,
      product_price
    ])


    if (addtocart.rowCount = 1) {
      return res.status(200).json({ msg: "add to cart Successfully" })
    } else {
      return res.status(500).json({ msg: "Something went to wrong! Add to cart" })
    }
  } catch (err) {

    return res.status(500).json({ error: err.message })
  }
};

module.exports.updatecart = async (req, res) => {
  try {

    const { product_id, qty } = req.body;

    const updatetocart = await pooldb.query("Update _cart set qty = $1 where p_id = $2 and ip_add = $3", [
      qty,
      product_id,
      req.user_id
    ])


    if (updatetocart.rowCount = 1) {
      return res.status(200).json({ msg: "update to cart Successfully" })
    } else {
      return res.status(500).json({ msg: "Something went to wrong! update to cart" })
    }
  } catch (err) {

    return res.status(500).json({ error: err.message })
  }
};

module.exports.deletecart = async (req, res) => {
  try {

    const { product_id } = req.body;

    const deletetocart = await pooldb.query("delete from _cart where ip_add = $1 and p_id = $2", [
      req.user_id,
      product_id
    ])


    if (deletetocart.rowCount = 1) {
      return res.status(200).json({ msg: "Delete to cart Successfully" })
    } else {
      return res.status(500).json({ msg: "Something went to wrong! Delete to cart" })
    }
  } catch (err) {

    return res.status(500).json({ error: err.message })
  }
};
