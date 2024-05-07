const { errors } = require("puppeteer");
const pool = require("../db/db");
const pooldb = require("../db/db");
const authorize = require("../middleware/token_auth");
const fs = require("fs");
const csvjson = require("csvtojson");

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

    const addtocart = await pooldb.query(
      "Insert into _cart(p_id,ip_add,qty,p_price,customer_id) VALUES ($1,$2,$3,$4,$5)",
      [product_id, req.user_id, qty, product_price, res.user_id]
    );

    if ((addtocart.rowCount = 1)) {
      return res.status(200).json({ msg: "add to cart Successfully" });
    } else {
      return res
        .status(500)
        .json({ msg: "Something went to wrong! Add to cart" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.updatecart = async (req, res) => {
  try {
    const { product_id, qty } = req.body;

    const updatetocart = await pooldb.query(
      "Update _cart set qty = $1 where p_id = $2 and ip_add = $3",
      [qty, product_id, req.user_id]
    );

    if ((updatetocart.rowCount = 1)) {
      return res.status(200).json({ msg: "update to cart Successfully" });
    } else {
      return res
        .status(500)
        .json({ msg: "Something went to wrong! update to cart" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.deletecart = async (req, res) => {
  try {
    const { product_id } = req.body;

    const deletetocart = await pooldb.query(
      "delete from _cart where ip_add = $1 and p_id = $2",
      [req.user_id, product_id]
    );

    if ((deletetocart.rowCount = 1)) {
      return res.status(200).json({ msg: "Delete to cart Successfully" });
    } else {
      return res
        .status(500)
        .json({ msg: "Something went to wrong! Delete to cart" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.coupons = async (req, res) => {
  try {
    const { product_id, coupons_code } = req.body;

    //check couponse_code available for this product_id
    const checkCouponsCode = await pooldb.query(
      "select * from apply_coupons where product_id = $1 and coupons_code = $2",
      [product_id, coupons_code]
    );

    if (checkCouponsCode.rowCount == 0) {
      return res.status(400).json({
        error: "Sorry ! Coupons not for this product",
      });
    } else {
      const limitapply = await pooldb.query(
        "select * from _coupons where product_id =$1 and customer_id = $2",
        [product_id, req.user_id]
      );

      const couponslimit = await pooldb.query(
        "select * from apply_coupons where product_id =$1",
        [product_id]
      );

      let limitP = limitapply.rowCount != 0 ? limitapply.rowCount : 0;

      //coupons limit check
      if (limitP == couponslimit.rows[0].coupons_limit) {
        return res.status(201).json({ error: "coupons limit exceeds" });
      } else {
        let limitUsed = limitP + 1;

        const insertCoupons = await pooldb.query(
          "Insert Into _coupons(product_id,coupon_title,coupon_price,coupon_code,coupon_used,customer_id) Values ($1,$2,$3,$4,$5,$6)",
          [
            product_id,
            couponslimit.rows[0].coupons_name,
            couponslimit.rows[0].discount,
            couponslimit.rows[0].coupons_code,
            limitUsed,
            req.user_id,
          ]
        );

        if (insertCoupons.rowCount == 1) {
          return res.status(200).json({ message: "data add successfully" });
        } else {
          return res.status(201).json({ message: "data add Unsuccessfully" });
        }
      }
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.csv_import = async (req, res) => {
  try {
    csvjson()
      .fromFile(req.file.path)
      .then(async (response) => {
        for (var x = 0; x < response.length; x++) {
          let query =
            "INSERT INTO _products (product_name, product_price, qty) VALUES ($1,$2,$3)";
          let paramter = [
            response[x]["product name"],
            parseFloat(response[x]["product price"]),
            parseFloat(response[x]["qty"]),
          ];

          await pool.query(query, paramter, (error, res) => {
            //console.log(error || res);
          });
        }
      });

    res.status(500).json({ msg: "csv import successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

