const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {

    // Get token from header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(201).json({ error: "No Token Provided" });
    } else {
      const payload = jwt.verify(token, process.env.secret);

      if (payload) {
        req.user_id = payload.user;
      } else {
        return res.status(403).json({ error: "unauthoried access" });
      }
    }
  } catch (err) {
    return res.status(500).json({ errors: err.message });
  }

  next();
};
