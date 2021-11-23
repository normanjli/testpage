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
    const { username, password } = req.body;
    console.log(req.body);
    if (await User.findOne({ where: { username: username } })) {
      return console.log(`dont do that`);
    } else {
      const salt = bcrypt.genSaltSync(12);
      const passwordHash = bcrypt.hashSync(password, salt);
      await User.create({
        username: username,
        password: passwordHash,
        salt: salt,
      });
      res.status(200).send(`success`)
    }
  },
  changeUser: async(req,res)=>{
    const { newUsername, oldPassword, new_password } = req.body.data;
  if (newUsername !== `` || new_password !== ``) {
    const user = await User.findOne({ where: { id: req.user } });
    const hashedPassword = bcrypt.hashSync(oldPassword, user.salt);
    if (user.password !== hashedPassword) {
      return res.status(401).send(`Old Password doesnt match`);
    } else {
      if (newUsername === ``) {
        try {
          const salt = bcrypt.genSaltSync(12);
          const newPass = bcrypt.hashSync(new_password, salt);
          User.update(
            { password: newPass, salt: salt },
            { where: { id: req.user } }
          );
          return res.status(200).send(`success`);
        } catch (err) {
          return res.status(400).send(`failed`);
        }
      } else if (new_password === ``)
        try {
          User.update({ username: newUsername }, { where: { id: req.user } });
        } catch (err) {
          return res.status(400).send("failed");
        }
      else {
        try {
          const salt = bcrypt.genSaltSync(12);
          const newPass = bcrypt.hashSync(new_password, salt);
          User.update(
            { username: newUsername, password: newPass, salt: salt },
            { where: { id: req.user } }
          );
          return res.status(200).send(`success`);
        } catch (err) {
          return res.status(400).send(`failed`);
        }
      }
    }
  }}
};
