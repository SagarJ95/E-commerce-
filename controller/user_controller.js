const pool = require("../db/db");
const jwtGenerate = require("../utilites/jwt");
const bcryptjs = require("bcryptjs");

module.exports.user_register = async (req, res) => {
  try {
    let { firstname, lastname, email, phone, password } = req.body;
    const emailId = await pool.query("select * from register where email=$1", [
      email,
    ]);

    if (emailId.rows.length != 0) {
      res.status(409).json({ message: "Email already exists" });
    } else {
      bcryptjs.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          res.status(500).json({ err: "Internal Server Error" });
        } else {
          firstname = firstname.toUpperCase() + firstname.slice(1);
          lastname = lastname.toUpperCase() + lastname.slice(1);

          const users = await pool.query(
            "Insert into users(firstname,lastname,email,phone,password) values ($1,$2,$3,$4,$5) RETURNING ",
            [firstname, lastname, email, phone, hashedPassword]
          );

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
