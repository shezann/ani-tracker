const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../helpers/validators");
require("dotenv").config();

const User = require("../../models/user.model");

function generateToken(user) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar_url: user.avatar_url,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
  return token;
}

module.exports = {
  Mutation: {
    async addAvatar(_, { username, avatar_url }) {
      //TODO: add validators later
      let user = await User.findOne({ username });

      if (user && avatar_url) {
        user.avatar_url = avatar_url;
        await user.save();
        return user;
      }
      // TODO: throw error catching later
    },

    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Login Input Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User doesn't exist", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Credentials don't match";
        throw new UserInputError("Credentials don't match", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async register(
      parent,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Register Input Errors", { errors });
      }
      // make sure user is unique
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      // hash password and create an auth token
      password = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
