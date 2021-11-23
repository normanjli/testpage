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
    if (await User.findOne({ where: { username: username } })) {
      return res.status(409).send(`Username already exists`);
    } else {
      const salt = bcrypt.genSaltSync(12);
      const passwordHash = bcrypt.hashSync(password, salt);
      await User.create({
        username: username,
        password: passwordHash,
        salt: salt,
      });
      res.status(200).send(`success`);
    }
  },
  changeUser: async (req, res) => {
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
            await User.update(
              { username: newUsername },
              { where: { id: req.user } }
            );
            res.status(200).send(newUsername);
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
            return res.status(200).send(newUsername);
          } catch (err) {
            return res.status(400).send(`failed`);
          }
        }
      }
    }
  },
  deleteUser: async (req, res) => {
    const { oldPassword } = req.body;
    const user = await User.findOne({ where: { id: req.user } });
    if (user === null){
      return res.status(410).send(`No Account found`)
    }
    const hashedPassword = bcrypt.hashSync(oldPassword, user.salt);
    if (user.password !== hashedPassword) {
      return res.status(401).send(`Enter correct password to delete account`);
    }else {
      await User.destroy({ where: { id: req.user } })
      res.status(200).send(`Account Successfully deleted`)
    }
  },
};
