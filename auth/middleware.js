const bcrypt = require("bcryptjs");

module.exports = (req, res, next) => {
  // check that we remembered the client and they've logged in
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ you: "shall not pass!" });
  }
};
