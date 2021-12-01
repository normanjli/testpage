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
const UserDrink = require(`../models/user_drink`)(sequelize, DataTypes);
const bcrypt = require(`bcryptjs`);

module.exports = {
  createUser: async (req, res) => {
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync(12);
    const passwordHash = bcrypt.hashSync(password, salt);
    try {
      await User.create({
        username: username,
        password: passwordHash,
        salt: salt,
      });
      res.status(200).send(`success`);
    } catch (error) {
      !error.errors.ValidationError
        ? res.status(409).send(`Username already exists`)
        : res.status(400).send(`Database Error try again later`);
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
            await User.update(
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
            !error.errors.ValidationError
              ? res.status(409).send(`Username already exists`)
              : res.status(400).send(`Database Error try again later`);
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
            !error.errors.ValidationError
              ? res.status(409).send(`Username already exists`)
              : res.status(400).send(`Database Error try again later`);
          }
        }
      }
    }
  },
  login: async (req, res) => {
    try {
      let user = await User.findOne({ where: { id: req.user } });
      let likedDrinks = await UserDrink.findAll({
        where: { User_id: req.user },
        attributes: ["Drink_id"],
      });
      res
        .status(200)
        .send([user.username, likedDrinks.map((element) => element.Drink_id)]);
    } catch (error) {
      res.status(400).send(`Database Error`);
    }
  },
  deleteUser: async (req, res) => {
    const { oldPassword } = req.body;
    const user = await User.findOne({
      where: { id: req.user },
    });
    if (user === null) {
      return res.status(410).send(`No Account found`);
    }
    const hashedPassword = bcrypt.hashSync(oldPassword, user.salt);
    if (user.password !== hashedPassword) {
      return res.status(401).send(`Enter correct password to delete account`);
    } else {
      await User.destroy({ where: { id: req.user } });
      req.session.destroy((err) => console.log(err));
      res.status(200).send(`Account Successfully deleted`);
    }
  },
  likeDrink: async (req, res) => {
    if (req.user) {
      const { idDrink, strDrink } = req.body.drink;
      try {
        await UserDrink.create({ User_id: req.user, Drink_id: idDrink });
        res.status(200).send(`Added ${strDrink} to Liked Drinks`);
      } catch (error) {
        res.status(400).send(`Did not add drink to liked drinks, try again`);
      }
    } else {
      res.status(401).send(`Log in first to like Drinks`);
      return;
    }
  },
  unLikeDrink: async (req, res) => {
    const { id } = req.params;
    try {
      await UserDrink.destroy({ where: { User_id: req.user, Drink_id: id } });
      let likedDrinks = await UserDrink.findAll({
        where: { User_id: req.user },
        attributes: ["Drink_id"],
      });
      res.status(200).send(likedDrinks.map((element) => element.Drink_id));
    } catch (error) {
      res.status(400).send(`Did not remove drink from liked drinks, try again`);
    }
  },
  getLikedDrinks: async (req, res) => {
    if(req.user){
    try {
        let likedDrinks = await UserDrink.findAll({
          where: { User_id: req.user },
          attributes: ["Drink_id"],
        });
        res.status(200).send(likedDrinks.map((element) => element.Drink_id));
    } catch (error) {
      res.status(400).send(`Database Error`);
    }
  }else{
    res.status(401).send('Please Login first')
  }
  },
};
