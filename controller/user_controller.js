const pool = require("../db/db");
const jwtGenerate = require("../utilites/jwt");
const bcryptjs = require("bcryptjs");

module.exports.user_register = async (req, res) => {
  try {
    let { name, email, contact, password, country, city, address } = req.body;

    const emailId = await pool.query("select * from _customers where customer_email=$1", [
      email,
    ]);
    console.log("count", emailId.rows)
    if (emailId.rows.length != 0) {
      res.status(409).json({ message: "Email already exists" });
    } else {

      bcryptjs.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          res.status(500).json({ err: "Internal Server Error" });
        } else {
          const users = await pool.query(
            "INSERT INTO _customers(customer_name, customer_email, customer_contact, customer_pass, customer_country, customer_city, customer_address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, email, contact, hashedPassword, country, city, address]
          );

          console.log("users>", users);
          const jwttoken = jwtGenerate(users.rows[0].user_id);

          res.status(200).json({
            message: "Account created successfully",
            jwttoken,
          });
        }
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.user_login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkemailId = await pool.query("select * from _customers where customer_email=$1", [
      email
    ]);

    if (checkemailId.rows.length == 0) {
      res.status(404).json({ msg: "Sorry! user doesn't exits. please create new account" })
    } else {
      bcryptjs.compare(password, checkemailId.rows[0].customer_pass, async (err, validPassword) => {
        if (err) {
          res.status(401).json({ error: "Sorry! Email or password is incorrect" })
        } else if (validPassword) {
          const jwttoken = jwtGenerate(checkemailId.rows[0].user_id);

          res.status(200).json({
            message: "User login successfully",
            jwttoken,
          });
        } else {
          res.status(500).json({
            error: "Sorry! Email or password is incorrect",
          })
        }
      })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }


}
