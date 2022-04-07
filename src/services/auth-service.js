const db = require("../database/postgre/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  registerNewUser: async function (payload) {
    try {
      payload.password = await bcrypt.hash(
        payload.password,
        bcrypt.genSaltSync(10)
      );
      payload.createdAt = new Date();
      payload.updatedAt = new Date();

      const data = await db.users.create(payload);
      return data;
    } catch (error) {
      throw error;
    }
  },

  checkAuth: async function (payload) {
    try {
      const users = await db.users.findOne({
        where: { username: payload.username },
      });

      if (!users) {
        throw new Error("users not found");
      }

      const isPasswordMatch = await bcrypt.compare(
        payload.password,
        users.password
      );

      if (!isPasswordMatch) {
        throw new Error("password is not match");
      }

      const token = jwt.sign(
        {
          username: users.username,
          exp: Math.floor(Date.now() / 1000) + 20,
        },
        process.env.JWT_SECRET_KEY
      );

      const refreshToken = jwt.sign(
        {
          username: users.username,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      return { token, refreshToken };
    } catch (error) {
      throw error;
    }
  },

  refreshToken: async function (payload) {
    try {
      const data = await jwt.verify(payload.token, process.env.JWT_SECRET_KEY);
      const newtoken = jwt.sign(
        { username: data.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: 60 }
      );

      return {
        newtoken,
      };
    } catch (error) {
      throw new Error("refresh token is not valid");
    }
  },
};
