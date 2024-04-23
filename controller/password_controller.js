const bcryptjs = require('bcryptjs')
const pooldb = require('../db/db');
const jwtGenerate = require('../utilites/jwt');

//Forget Password
module.exports.forget_password = async (req, res) => {
    try {
        const { email } = req.body;

        const Checkemail = await pooldb.query("select * from _customers where customer_email=$1", [
            email
        ]);

        if (Checkemail.rows.length == 0) {
            return res.status(400).json({ error: "Sorry! Email is not register . Please register First" });
        } else {
            return res.status(200).json({ email });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


//Reset Password
module.exports.reset_password = async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkEmail = await pooldb.query("select * from _customers where customer_email=$1", [
            email
        ]);

        if (checkEmail.rows.length == 0) {
            return res.status(400).json({
                error: "Please Register Email"
            });
        } else {
            bcryptjs.hash(password, 10, async (err, hashpassword) => {
                if (err) {
                    return res.status(500).json({ error: "An error occured while reseting your password. Please try again!" });
                } else {
                    await pooldb.query("update _customers SET customer_pass=$1 where customer_email=$2", [
                        hashpassword,
                        email
                    ]);

                    const jwttoken = jwtGenerate(checkEmail.rows[0].user_id);

                    return res.status(200).json({
                        message: "Account created successfully",
                        jwttoken,
                    })
                }
            })

        }
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}
