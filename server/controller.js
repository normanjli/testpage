require(`dotenv`).config();
const passport = require(`passport`);
const LocalStrategy = require(`passport-local`).Strategy;
const DATABASE_URL = process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require(`sequelize`);
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: `postgres`,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
    },
  },
});
const User = require("../models/user")(sequelize, DataTypes);
const bcrypt = require(`bcryptjs`);

module.exports = {
  createUser: async (req, res) => {
    const { username, password } = req.body.data;
    const salt = bcrypt.genSaltSync(12);
    const passwordHash = bcrypt.hashSync(password,salt);
    User.create({ email: username, password: passwordHash, salt:salt });
    // const user=await User.create({email:username, password:pinHash})
  },

};
