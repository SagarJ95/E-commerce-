const pool = require("../db/db");
const jwtGenerate = require("../utilites/jwt");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
const send_email_error = require("../validation/send_email_error");
const UserValidation = require("../validation/user_validation");
const { validateInfo } = require("express-validator");

module.exports.user_register = async (req, res) => {
  try {
    let { name, email, contact, password, country, city, address } = req.body;

    const errorlength = UserValidation.registerValidation(req.body);

    if (errorlength) {
      return res
        .status(400)
        .json({ msg: errorlength.error.details[0].message });
    }

    const emailId = await pool.query(
      "select * from _customers where customer_email=$1",
      [email]
    );

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

    const errorList = UserValidation.loginValidation(req.body);

    if (errorList) {
      return res.status(400).json({ msg: errorList.error.details[0].message });
    }

    const checkemailId = await pool.query(
      "select * from _customers where customer_email=$1",
      [email]
    );

    if (checkemailId.rows.length == 0) {
      res
        .status(404)
        .json({ msg: "Sorry! user doesn't exits. please create new account" });
    } else {
      bcryptjs.compare(
        password,
        checkemailId.rows[0].customer_pass,
        async (err, validPassword) => {
          if (err) {
            res
              .status(401)
              .json({ error: "Sorry! Email or password is incorrect" });
          } else if (validPassword) {
            const jwttoken = jwtGenerate(checkemailId.rows[0].customer_id);

            res.status(200).json({
              message: "User login successfully",
              jwttoken,
            });
          } else {
            res.status(500).json({
              error: "Sorry! Email or password is incorrect",
            });
          }
        }
      );
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.contact_us = async (req, res) => {
  try {
    const { first_name, last_name, message, email } = req.body;

    const ContactError = UserValidation.contactValidation(req.body);

    if (ContactError) {
      return res
        .status(400)
        .json({ msg: ContactError.error.details[0].message });
    }

    if (first_name == "" || last_name == "" || email == "") {
      return res.status(401).json({ msg: "Please fill all the fields" });
    } else {
      const storedb = await pool.query(
        "Insert into _contact_us(first_name,last_name,contact_email,contact_desc) values ($1,$2,$3,$4)",
        [first_name, last_name, email, message]
      );

      if ((storedb.rowCount = 1)) {
        return res.status(200).json({ msg: "Store Successfully" });
      } else {
        return res.status(500).json({ msg: "Something went to wrong" });
      }
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports.sendEmail = (req, res) => {
  try {
    const { email } = req.body;

    //show single errors
    const errorMessages = send_email_error.sendemailError(req.body);

    if (errorMessages) {
      return res
        .status(400)
        .json({ email: errorMessages.error.details[0].message });
    }

    //show multiple error
    // if (errorMessages && errorMessages.length > 0) {
    //   return res.status(400).json({ error: errorMessages });
    // }

    if (!email) {
      return res.status(201).json({ msg: "Please Enter Email" });
    } else {
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "info@oneroof.tech",
          pass: "WeAre1rooftech*",
        },
      });

      const mailerOption = {
        from: "info@oneroof.tech",
        to: "sagarjagade2023@gmail.com",
        subject: "testing",
        text: "testing",
      };

      transport.sendMail(mailerOption, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
