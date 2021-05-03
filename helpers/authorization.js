const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    //Bearer token
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired Token");
      }
    }
    //if no token
    throw new Error(`Auth token must be Bearer [token]`);
  }
  //if no authheader
  throw new Error(`Auth header must be provided`);
};
