const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  if (req.headers.authorization !== undefined) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "banao-assignment", (error, data) => {
      if (!error) {
        next();
      } else {
        res.status(403).send({ message: "invalid token" });
      }
    });
  } else {
    res.status(403).send({ message: "please provide a token" });
  }
}

module.exports = verifyToken;
